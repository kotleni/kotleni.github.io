import {createServer} from 'node:http';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import WebSocket, {WebSocketServer} from 'ws';

const PORT = Number.parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';
const MAX_ACTIVE = 32;
const MAX_RECORDED = 8;
const MIN_SESSION_MS = 10000;
const MIN_MOVED_PX = 10;
const DATA_FILE = resolve(
    process.env.DATA_FILE || './data/recordings.json',
);

function hslToHex(h, s, l) {
    const sat = s / 100;
    const light = l / 100;
    const a = sat * Math.min(light, 1 - light);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

const PALETTE = Array.from({length: MAX_ACTIVE}, (_, i) =>
    hslToHex((i * 137.508) % 360, 85, 55),
);

function normalizeRoom(raw) {
    if (typeof raw !== 'string' || raw.trim() === '') return '/';
    let value = raw.trim();
    if (value.includes('://')) {
        try {
            value = new URL(value).pathname;
        } catch {
            value = '/';
        }
    }
    try {
        value = decodeURIComponent(value);
    } catch {
        value = '/';
    }
    value = value.split('?')[0].split('#')[0];
    if (!value.startsWith('/')) value = `/${value}`;
    if (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
    if (value.length > 200) value = value.slice(0, 200);
    return value || '/';
}

const rooms = new Map();
const recordingsByRoom = new Map();

function loadRecordings() {
    try {
        const raw = readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return;
        for (const [room, list] of Object.entries(parsed)) {
            if (!Array.isArray(list)) continue;
            const valid = list
                .filter(
                    item =>
                        item &&
                        typeof item.duration === 'number' &&
                        Array.isArray(item.points),
                )
                .slice(-MAX_RECORDED);
            if (valid.length > 0) recordingsByRoom.set(room, valid);
        }
    } catch {
        return;
    }
}

function saveRecordings() {
    try {
        mkdirSync(dirname(DATA_FILE), {recursive: true});
        const data = {};
        for (const [room, list] of recordingsByRoom.entries()) {
            data[room] = list;
        }
        writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch {
        return;
    }
}

function getRoom(name) {
    let room = rooms.get(name);
    if (!room) {
        room = {users: new Map()};
        rooms.set(name, room);
    }
    return room;
}

function send(ws, payload) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
    }
}

function broadcast(room, payload, exceptId) {
    for (const user of room.users.values()) {
        if (user.id !== exceptId) send(user.ws, payload);
    }
}

function publicUser(user) {
    return {id: user.id, color: user.color};
}

function positionedUser(user) {
    return {id: user.id, color: user.color, x: user.x, y: user.y};
}

function detachUser(ws) {
    const user = ws.user;
    if (!user) return false;
    ws.user = null;
    const room = rooms.get(user.room);
    if (room) {
        if (user.dragging) {
            broadcast(room, {type: 'drag-end', id: user.id}, user.id);
        }
        room.users.delete(user.id);
        broadcast(room, {type: 'leave', id: user.id}, user.id);
        if (room.users.size === 0) rooms.delete(user.room);
    }
    const duration = Date.now() - user.joinedAt;
    if (
        duration >= MIN_SESSION_MS &&
        user.movedPx >= MIN_MOVED_PX &&
        user.points.length >= 2
    ) {
        const recording = {
            id: crypto.randomUUID(),
            duration,
            points: user.points.slice(),
        };
        let list = recordingsByRoom.get(user.room);
        if (!list) {
            list = [];
            recordingsByRoom.set(user.room, list);
        }
        list.push(recording);
        while (list.length > MAX_RECORDED) list.shift();
        saveRecordings();
        if (room) broadcast(room, {type: 'recording', recording}, user.id);
    }
    return true;
}

function joinRoom(ws, rawRoom) {
    if (ws.user) return true;
    const roomName = normalizeRoom(rawRoom);
    const room = getRoom(roomName);
    if (room.users.size >= MAX_ACTIVE) {
        send(ws, {type: 'error', message: 'room full'});
        try {
            ws.close(1013, 'room full');
        } catch {
            return false;
        }
        return false;
    }
    const usedSlots = new Set(
        [...room.users.values()].map(user => user.slot),
    );
    let slot = 0;
    while (usedSlots.has(slot)) slot += 1;
    const user = {
        id: crypto.randomUUID(),
        room: roomName,
        color: PALETTE[slot] || '#888888',
        slot,
        ws,
        joinedAt: Date.now(),
        x: 0.5,
        y: 0.5,
        hasMoved: false,
        lastPx: null,
        lastPy: null,
        movedPx: 0,
        points: [],
        lastPointAt: 0,
        dragging: false,
    };
    ws.user = user;
    room.users.set(user.id, user);
    const others = [...room.users.values()]
        .filter(other => other.id !== user.id && other.hasMoved)
        .map(positionedUser);
    send(ws, {
        type: 'welcome',
        id: user.id,
        color: user.color,
        room: roomName,
        users: others,
        recordings: recordingsByRoom.get(roomName) || [],
    });
    broadcast(room, {type: 'join', id: user.id, color: user.color}, user.id);
    return true;
}

function parseMove(msg, user) {
    const x = Number(msg.x);
    const y = Number(msg.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    const w = Number(msg.w);
    const h = Number(msg.h);
    let normX;
    let normY;
    let px;
    let py;
    if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0) {
        normX = Math.min(1, Math.max(0, x / w));
        normY = Math.min(1, Math.max(0, y / h));
        px = x;
        py = y;
    } else if (x > 1 || y > 1) {
        px = x;
        py = y;
        normX = Math.min(1, Math.max(0, x / 1920));
        normY = Math.min(1, Math.max(0, y / 1080));
    } else {
        normX = Math.min(1, Math.max(0, x));
        normY = Math.min(1, Math.max(0, y));
        px = normX * 1000;
        py = normY * 1000;
    }
    return {normX, normY, px, py};
}

function handleMove(ws, msg) {
    const user = ws.user;
    if (!user) return;
    const parsed = parseMove(msg, user);
    if (!parsed) return;
    if (user.lastPx !== null && user.lastPy !== null) {
        user.movedPx += Math.hypot(
            parsed.px - user.lastPx,
            parsed.py - user.lastPy,
        );
    }
    user.lastPx = parsed.px;
    user.lastPy = parsed.py;
    user.x = parsed.normX;
    user.y = parsed.normY;
    user.hasMoved = true;
    const now = Date.now();
    const lastPoint = user.points[user.points.length - 1];
    const shouldStore =
        !lastPoint ||
        now - user.lastPointAt >= 50 ||
        Math.hypot(
            parsed.normX - lastPoint.x,
            parsed.normY - lastPoint.y,
        ) >= 0.005;
    if (shouldStore && user.points.length < 3000) {
        user.points.push({
            x: Math.round(parsed.normX * 10000) / 10000,
            y: Math.round(parsed.normY * 10000) / 10000,
            t: now - user.joinedAt,
        });
        user.lastPointAt = now;
    }
    const room = rooms.get(user.room);
    if (room) {
        broadcast(
            room,
            {type: 'move', id: user.id, x: parsed.normX, y: parsed.normY},
            user.id,
        );
    }
}

loadRecordings();

const httpServer = createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    if (url.pathname === '/health') {
        let totalUsers = 0;
        for (const room of rooms.values()) totalUsers += room.users.size;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(
            JSON.stringify({
                ok: true,
                rooms: rooms.size,
                users: totalUsers,
            }),
        );
        return;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('cursor presence server');
});

const wss = new WebSocketServer({server: httpServer});
wss.on('connection', (ws, req) => {
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    const url = new URL(req.url || '/', 'http://localhost');
    const roomParam =
        url.searchParams.get('room') ||
        url.searchParams.get('path') ||
        url.searchParams.get('page');
    if (roomParam) joinRoom(ws, roomParam);
    ws.on('message', raw => {
        let msg;
        try {
            msg = JSON.parse(raw.toString());
        } catch {
            return;
        }
        if (!msg || typeof msg.type !== 'string') return;
        if (msg.type === 'join') {
            joinRoom(ws, msg.path || msg.room || msg.page || msg.url || '/');
            return;
        }
        if (msg.type === 'leave' || msg.type === 'disconnect') {
            detachUser(ws);
            try {
                ws.close();
            } catch {
                return;
            }
            return;
        }
        if (
            msg.type === 'move' ||
            msg.type === 'cursor' ||
            msg.type === 'mousemove' ||
            msg.type === 'position'
        ) {
            handleMove(ws, msg);
            return;
        }
        if (msg.type === 'drag-start') {
            const user = ws.user;
            if (!user) return;
            const kind = msg.kind === 'ball' || msg.kind === 'rope' ? msg.kind : null;
            const index = Number(msg.index);
            if (!kind || !Number.isInteger(index) || index < 0) return;
            user.dragging = true;
            const room = rooms.get(user.room);
            if (room) {
                broadcast(
                    room,
                    {type: 'drag-start', id: user.id, kind, index},
                    user.id,
                );
            }
            return;
        }
        if (msg.type === 'drag-end') {
            const user = ws.user;
            if (!user) return;
            user.dragging = false;
            const room = rooms.get(user.room);
            if (room) {
                broadcast(room, {type: 'drag-end', id: user.id}, user.id);
            }
            return;
        }
        if (msg.type === 'ping') {
            send(ws, {type: 'pong'});
        }
    });
    ws.on('close', () => detachUser(ws));
    ws.on('error', () => detachUser(ws));
});

const heartbeat = setInterval(() => {
    for (const ws of wss.clients) {
        if (ws.isAlive === false) {
            try {
                ws.terminate();
            } catch {
                continue;
            }
            continue;
        }
        ws.isAlive = false;
        try {
            ws.ping();
        } catch {
            continue;
        }
    }
}, 30000);
heartbeat.unref();

httpServer.listen(PORT, HOST, () => {
    console.log(`cursor backend listening on ${HOST}:${PORT}`);
});

function shutdown() {
    clearInterval(heartbeat);
    wss.close(() => httpServer.close(() => process.exit(0)));
    setTimeout(() => process.exit(0), 5000).unref();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

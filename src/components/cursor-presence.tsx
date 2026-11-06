import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
    ghostCursors,
    remoteCursors,
    remoteGarlandDrags,
    setLocalGarlandDragListener,
} from '@/lib/remote-cursors';
import {useReducedMotion} from '@/lib/snowfall';

interface RecordingPoint {
    x: number;
    y: number;
    t: number;
}

interface Recording {
    id: string;
    duration: number;
    points: RecordingPoint[];
}

const RECORDING_GAP_MS = 3000;

type ToastKind = 'info' | 'success' | 'error';

interface Toast {
    id: number;
    title: string;
    description: string;
    kind: ToastKind;
    color?: string;
}

function drawCursor(
    ctx: CanvasRenderingContext2D,
    fx: number,
    fy: number,
    color: string,
    alpha: number,
) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx, fy + 16);
    ctx.lineTo(fx + 4.5, fy + 11.5);
    ctx.lineTo(fx + 8, fy + 18);
    ctx.lineTo(fx + 10, fy + 17);
    ctx.lineTo(fx + 6.5, fy + 10);
    ctx.lineTo(fx + 12, fy + 10);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
}

function pointAt(
    points: RecordingPoint[],
    t: number,
): {x: number; y: number} | null {
    const first = points[0];
    const last = points[points.length - 1];
    if (!first || !last) return null;
    if (t <= first.t) return {x: first.x, y: first.y};
    if (t >= last.t) return {x: last.x, y: last.y};
    let lo = 0;
    let hi = points.length - 1;
    while (hi - lo > 1) {
        const mid = Math.floor((lo + hi) / 2);
        const midPoint = points[mid];
        if (!midPoint) break;
        if (midPoint.t <= t) lo = mid;
        else hi = mid;
    }
    const a = points[lo];
    const b = points[hi];
    if (!a || !b || b.t === a.t) return a ? {x: a.x, y: a.y} : null;
    const k = (t - a.t) / (b.t - a.t);
    return {x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k};
}

export function CursorPresence() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const location = useLocation();
    const reducedMotion = useReducedMotion();
    const pathname = location.pathname;
    const recordingsRef = useRef<Recording[]>([]);
    const offsetsRef = useRef(new Map<string, number>());
    const [toasts, setToasts] = useState<Toast[]>([]);
    const toastSeqRef = useRef(0);
    const toastTimersRef = useRef(
        new Map<number, ReturnType<typeof setTimeout>>(),
    );
    const lastToastRef = useRef({key: '', at: 0});
    const hasConnectedRef = useRef(false);
    const hasEverConnectedRef = useRef(false);

    const dismissToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
        const timer = toastTimersRef.current.get(id);
        if (timer) clearTimeout(timer);
        toastTimersRef.current.delete(id);
    }, []);

    const pushToast = useCallback(
        (
            title: string,
            description: string,
            kind: ToastKind,
            color?: string,
        ) => {
            const key = `${title}:${description}`;
            const now = Date.now();
            if (
                lastToastRef.current.key === key &&
                now - lastToastRef.current.at < 1000
            ) {
                return;
            }
            lastToastRef.current = {key, at: now};
            const id = ++toastSeqRef.current;
            setToasts(prev => {
                const next = [...prev, {id, title, description, kind, color}];
                return next.length > 4 ? next.slice(-4) : next;
            });
            const timer = setTimeout(() => {
                toastTimersRef.current.delete(id);
                setToasts(prev => prev.filter(toast => toast.id !== id));
            }, 4500);
            toastTimersRef.current.set(id, timer);
        },
        [],
    );

    useEffect(() => {
        const timers = toastTimersRef.current;
        return () => {
            for (const timer of timers.values()) clearTimeout(timer);
            timers.clear();
        };
    }, []);

    useEffect(() => {
        if (reducedMotion) return;
        remoteCursors.clear();
        ghostCursors.clear();
        remoteGarlandDrags.clear();
        recordingsRef.current = [];
        offsetsRef.current.clear();
        hasConnectedRef.current = false;
        hasEverConnectedRef.current = false;
        setToasts([]);

        const base = import.meta.env.DEV
            ? `ws://${window.location.hostname}:3001`
            : 'ws://amber.kotle.uk:3001';

        let closed = false;
        let stopReconnect = false;
        let ws: WebSocket | null = null;
        let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
        let reconnectAttempt = 0;
        let lastSentAt = 0;
        let lastSentX = -1;
        let lastSentY = -1;
        let lastClientX = -1;
        let lastClientY = -1;

        const scheduleConnect = (delay: number) => {
            if (reconnectTimer) clearTimeout(reconnectTimer);
            reconnectTimer = setTimeout(connect, delay);
        };
        const scheduleReconnect = () => {
            const delay = Math.min(3000 * Math.pow(2, reconnectAttempt), 30000);
            reconnectAttempt += 1;
            scheduleConnect(delay);
        };
        setLocalGarlandDragListener(drag => {
            if (!ws || ws.readyState !== WebSocket.OPEN) return;
            try {
                if (drag) {
                    ws.send(
                        JSON.stringify({
                            type: 'drag-start',
                            kind: drag.kind,
                            index: drag.index,
                        }),
                    );
                } else {
                    ws.send(JSON.stringify({type: 'drag-end'}));
                }
            } catch {
                return;
            }
        });

        const storeRecording = (recording: Recording) => {
            const list = recordingsRef.current;
            list.push(recording);
            while (list.length > 8) list.shift();
            if (
                recording.duration > 0 &&
                !offsetsRef.current.has(recording.id)
            ) {
                offsetsRef.current.set(
                    recording.id,
                    Math.random() * (recording.duration + RECORDING_GAP_MS),
                );
            }
        };

        const connect = () => {
            if (closed || stopReconnect) return;
            const separator = base.includes('?') ? '&' : '?';
            const url = `${base}${separator}room=${encodeURIComponent(pathname)}`;
            let socket: WebSocket;
            try {
                socket = new WebSocket(url);
            } catch {
                scheduleReconnect();
                return;
            }
            ws = socket;
            socket.onopen = () => {
                try {
                    socket.send(JSON.stringify({type: 'join', path: pathname}));
                } catch {
                    return;
                }
            };
            socket.onmessage = event => {
                let msg: {
                    type?: string;
                    id?: string;
                    color?: string;
                    x?: number;
                    y?: number;
                    message?: string;
                    users?: Array<{
                        id: string;
                        color: string;
                        x: number;
                        y: number;
                    }>;
                    recordings?: Recording[];
                    recording?: Recording;
                    kind?: string;
                    index?: number;
                };
                try {
                    msg = JSON.parse(String(event.data));
                } catch {
                    return;
                }
                if (msg.type === 'welcome') {
                    pushToast(
                        hasEverConnectedRef.current
                            ? 'Reconnected'
                            : 'Connected',
                        `Connected to ${pathname}`,
                        'success',
                    );
                    hasConnectedRef.current = true;
                    hasEverConnectedRef.current = true;
                    reconnectAttempt = 0;
                    remoteCursors.clear();
                    for (const user of msg.users || []) {
                        remoteCursors.set(user.id, {
                            id: user.id,
                            color: user.color,
                            x: user.x,
                            y: user.y,
                            tx: user.x,
                            ty: user.y,
                            hasPosition: true,
                        });
                    }
                    recordingsRef.current = [];
                    for (const recording of msg.recordings || []) {
                        storeRecording(recording);
                    }
                } else if (msg.type === 'join' && msg.id && msg.color) {
                    pushToast('User joined', pathname, 'info', msg.color);
                    if (!remoteCursors.has(msg.id)) {
                        remoteCursors.set(msg.id, {
                            id: msg.id,
                            color: msg.color,
                            x: 0,
                            y: 0,
                            tx: 0,
                            ty: 0,
                            hasPosition: false,
                        });
                    }
                } else if (
                    msg.type === 'move' &&
                    msg.id &&
                    typeof msg.x === 'number' &&
                    typeof msg.y === 'number'
                ) {
                    const user = remoteCursors.get(msg.id);
                    if (user) {
                        if (!user.hasPosition) {
                            user.x = msg.x;
                            user.y = msg.y;
                            user.hasPosition = true;
                        }
                        user.tx = msg.x;
                        user.ty = msg.y;
                    }
                } else if (
                    msg.type === 'drag-start' &&
                    msg.id &&
                    (msg.kind === 'ball' || msg.kind === 'rope') &&
                    typeof msg.index === 'number'
                ) {
                    remoteGarlandDrags.set(msg.id, {
                        kind: msg.kind,
                        index: msg.index,
                    });
                } else if (msg.type === 'drag-end' && msg.id) {
                    remoteGarlandDrags.delete(msg.id);
                } else if (msg.type === 'leave' && msg.id) {
                    const leaving = remoteCursors.get(msg.id);
                    pushToast('User left', pathname, 'info', leaving?.color);
                    remoteCursors.delete(msg.id);
                    remoteGarlandDrags.delete(msg.id);
                } else if (msg.type === 'recording' && msg.recording) {
                    storeRecording(msg.recording);
                    pushToast(
                        'New recording',
                        `Cursor recording added to ${pathname}`,
                        'info',
                    );
                } else if (msg.type === 'error') {
                    pushToast('Error', msg.message || 'Room error', 'error');
                    if ((msg.message || '').includes('full')) {
                        stopReconnect = true;
                        try {
                            socket.close();
                        } catch {
                            return;
                        }
                    }
                }
            };
            socket.onclose = () => {
                if (!closed && !stopReconnect) {
                    if (hasConnectedRef.current) {
                        pushToast(
                            'Disconnected',
                            `Connection lost to ${pathname} · reconnecting`,
                            'error',
                        );
                    }
                    hasConnectedRef.current = false;
                    scheduleReconnect();
                }
            };
            socket.onerror = () => {
                try {
                    socket.close();
                } catch {
                    return;
                }
            };
        };

        const sendPosition = () => {
            if (!ws || ws.readyState !== WebSocket.OPEN) return;
            if (lastClientX < 0 || lastClientY < 0) return;
            const now = performance.now();
            if (now - lastSentAt < 33) return;
            const w = Math.max(
                document.documentElement.scrollWidth,
                window.innerWidth,
            );
            const h = Math.max(
                document.documentElement.scrollHeight,
                window.innerHeight,
            );
            if (w === 0 || h === 0) return;
            const pageX = lastClientX + window.scrollX;
            const pageY = lastClientY + window.scrollY;
            const nx = pageX / w;
            const ny = pageY / h;
            if (
                Math.abs(nx - lastSentX) < 0.001 &&
                Math.abs(ny - lastSentY) < 0.001
            ) {
                return;
            }
            lastSentAt = now;
            lastSentX = nx;
            lastSentY = ny;
            try {
                ws.send(
                    JSON.stringify({
                        type: 'move',
                        x: pageX,
                        y: pageY,
                        w,
                        h,
                    }),
                );
            } catch {
                return;
            }
        };
        const onPointerMove = (event: PointerEvent) => {
            lastClientX = event.clientX;
            lastClientY = event.clientY;
            sendPosition();
        };
        const onScroll = () => {
            sendPosition();
        };

        scheduleConnect(100);
        window.addEventListener('pointermove', onPointerMove, {
            passive: true,
        });
        window.addEventListener('scroll', onScroll, {
            passive: true,
        });

        return () => {
            closed = true;
            setLocalGarlandDragListener(null);
            if (reconnectTimer) clearTimeout(reconnectTimer);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('scroll', onScroll);
            if (ws) {
                try {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({type: 'leave'}));
                    }
                    ws.close();
                } catch {
                    return;
                }
            }
        };
    }, [pathname, reducedMotion, pushToast]);

    useEffect(() => {
        if (reducedMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf = 0;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let lastTime = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const frame = (now: number) => {
            const dt = Math.min(0.033, Math.max(0, (now - lastTime) / 1000));
            lastTime = now;
            ctx.clearRect(0, 0, width, height);
            const pageW = Math.max(document.documentElement.scrollWidth, width);
            const pageH = Math.max(
                document.documentElement.scrollHeight,
                height,
            );
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            ghostCursors.clear();
            for (const recording of recordingsRef.current) {
                if (recording.duration <= 0 || recording.points.length < 2) {
                    continue;
                }
                const cycle = recording.duration + RECORDING_GAP_MS;
                const offset =
                    offsetsRef.current.get(recording.id) ??
                    Math.random() * cycle;
                offsetsRef.current.set(recording.id, offset);
                const t = (now + offset) % cycle;
                if (t >= recording.duration) continue;
                const point = pointAt(recording.points, t);
                if (!point) continue;
                ghostCursors.set(recording.id, {
                    id: recording.id,
                    x: point.x,
                    y: point.y,
                });
                drawCursor(
                    ctx,
                    point.x * pageW - scrollX,
                    point.y * pageH - scrollY,
                    '#9ca3af',
                    0.4,
                );
            }

            const k = 1 - Math.exp(-dt * 12);
            for (const user of remoteCursors.values()) {
                if (!user.hasPosition) continue;
                user.x += (user.tx - user.x) * k;
                user.y += (user.ty - user.y) * k;
                drawCursor(
                    ctx,
                    user.x * pageW - scrollX,
                    user.y * pageH - scrollY,
                    user.color,
                    1,
                );
            }

            raf = requestAnimationFrame(frame);
        };

        resize();
        window.addEventListener('resize', resize);
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            ctx.clearRect(0, 0, width, height);
            ghostCursors.clear();
        };
    }, [reducedMotion]);

    if (reducedMotion) return null;

    return (
        <>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                data-testid="cursor-presence"
                className="pointer-events-none fixed inset-0 z-[102] h-full w-full"
            />
            <div
                aria-live="polite"
                data-testid="cursor-toasts"
                className="pointer-events-none fixed right-4 bottom-4 z-[200] flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2"
            >
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        role="status"
                        className="win pointer-events-auto overflow-hidden"
                    >
                        <div className="titlebar">
                            <span>{toast.title}</span>
                            <span className="titlebar-buttons">
                                <button
                                    type="button"
                                    onClick={() => dismissToast(toast.id)}
                                    aria-label="Dismiss notification"
                                    className="titlebar-button flex items-center justify-center text-[10px] leading-none"
                                >
                                    ×
                                </button>
                            </span>
                        </div>
                        <div className="flex items-start gap-2 p-2 text-xs">
                            <span
                                aria-hidden="true"
                                className="mt-0.5 inline-block size-2.5 shrink-0 rounded-full border border-black/30"
                                style={{
                                    backgroundColor:
                                        toast.color ??
                                        (toast.kind === 'error'
                                            ? '#ef4444'
                                            : toast.kind === 'success'
                                              ? '#22c55e'
                                              : '#3b82f6'),
                                }}
                            />
                            <span className="min-w-0 flex-1 break-words">
                                {toast.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

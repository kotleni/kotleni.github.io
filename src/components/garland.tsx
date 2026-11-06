import {useEffect, useRef} from 'react';
import {
    emitLocalGarlandDrag,
    ghostCursors,
    remoteCursors,
    remoteGarlandDrags,
} from '@/lib/remote-cursors';
import {useReducedMotion} from '@/lib/snowfall';

interface RopePoint {
    x: number;
    y: number;
    px: number;
    py: number;
    pinned: boolean;
    mountX: number;
    phase: number;
}

interface Ornament {
    anchor: number;
    x: number;
    y: number;
    px: number;
    py: number;
    stringLength: number;
    radius: number;
    color: string;
    phase: number;
}

interface Bulb {
    point: number;
    color: string;
    phase: number;
}

const GRAVITY = 980;
const SUBSTEPS = 4;
const ITERATIONS = 4;
const ANCHOR_Y = 0;
const MOUNT_SPACING = 260;

const BALL_COLORS = ['#e63946', '#f1c40f', '#2a9d8f', '#4361ee', '#f72585'];
const BULB_COLORS = ['#ff5d5d', '#ffd166', '#6ee7b7', '#7dd3fc', '#fda4af'];

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function windAt(seconds: number): {x: number; y: number} {
    const baseX =
        Math.sin(seconds * 0.13) * 34 +
        Math.sin(seconds * 0.071 + 1.3) * 26 +
        Math.sin(seconds * 0.31 + 0.5) * 12;
    const gustPhase = Math.sin(seconds * 0.021 + 1.2);
    const gust = Math.sign(gustPhase) * Math.pow(Math.abs(gustPhase), 5) * 58;
    const turbulence =
        Math.sin(seconds * 1.7 + 0.3) * 6 + Math.sin(seconds * 2.9 + 2.1) * 3;
    return {
        x: baseX + gust + turbulence,
        y: Math.sin(seconds * 0.19 + 0.8) * 6,
    };
}

function buildGarland(width: number) {
    const minSegments = width >= 340 ? 2 : 1;
    const segmentCount = clamp(
        Math.round(width / MOUNT_SPACING),
        minSegments,
        10,
    );
    const segmentWidth = width / segmentCount;
    const sag = clamp(segmentWidth * 0.24, 28, 72);
    const pointsPerSegment = clamp(Math.round(segmentWidth / 22), 8, 20);
    const count = segmentCount * pointsPerSegment + 1;
    const points: RopePoint[] = [];

    for (let i = 0; i < count; i++) {
        const segment = Math.min(
            segmentCount - 1,
            Math.floor(i / pointsPerSegment),
        );
        const j = i - segment * pointsPerSegment;
        const u = j / pointsPerSegment;
        const v = u * 2 - 1;
        const x = (segment + u) * segmentWidth;
        const y = ANCHOR_Y + sag * (1 - v * v);
        const pinned = j === 0 || i === count - 1;
        points.push({
            x,
            y,
            px: x,
            py: y,
            pinned,
            mountX: x,
            phase: Math.random() * Math.PI * 2,
        });
    }

    let total = 0;
    for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        if (a && b) total += Math.hypot(b.x - a.x, b.y - a.y);
    }
    const restLength = total / (count - 1);

    const ornaments: Ornament[] = [];
    const bulbs: Bulb[] = [];

    for (let i = 2; i < count - 2; i += 3) {
        if (points[i]?.pinned) continue;
        bulbs.push({
            point: i,
            color: BULB_COLORS[i % BULB_COLORS.length] ?? '#ffd166',
            phase: Math.random() * Math.PI * 2,
        });
    }

    for (let i = 4; i < count - 3; i += 6) {
        const anchorPoint = points[i];
        if (!anchorPoint || anchorPoint.pinned) continue;
        const stringLength = 22 + (i % 3) * 6;
        const radius = 9 + (i % 3) * 2;
        const x = anchorPoint.x + 7;
        const y = anchorPoint.y + stringLength;
        ornaments.push({
            anchor: i,
            x,
            y,
            px: x,
            py: y,
            stringLength,
            radius,
            color: BALL_COLORS[i % BALL_COLORS.length] ?? '#e63946',
            phase: Math.random() * Math.PI * 2,
        });
    }

    return {points, ornaments, bulbs, restLength};
}

function drawGarland(
    ctx: CanvasRenderingContext2D,
    points: RopePoint[],
    ornaments: Ornament[],
    bulbs: Bulb[],
    isDark: boolean,
    seconds: number,
) {
    ctx.save();
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = isDark ? '#3f7a52' : '#234d2f';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(220,220,220,0.7)' : 'rgba(40,40,40,0.6)';
    for (const ornament of ornaments) {
        const anchor = points[ornament.anchor];
        if (!anchor) continue;
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(ornament.x, ornament.y);
        ctx.stroke();
    }

    for (const bulb of bulbs) {
        const point = points[bulb.point];
        if (!point) continue;
        const twinkle = 0.55 + 0.45 * Math.sin(seconds * 3 + bulb.phase);
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = bulb.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(point.x - 1.2, point.y - 1.2, 1.4, 0, Math.PI * 2);
        ctx.fill();
    }

    for (const ornament of ornaments) {
        ctx.fillStyle = ornament.color;
        ctx.beginPath();
        ctx.arc(ornament.x, ornament.y, ornament.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.beginPath();
        ctx.arc(
            ornament.x - ornament.radius * 0.35,
            ornament.y - ornament.radius * 0.35,
            ornament.radius * 0.32,
            0,
            Math.PI * 2,
        );
        ctx.fill();
        const anchor = points[ornament.anchor];
        if (anchor) {
            const dx = anchor.x - ornament.x;
            const dy = anchor.y - ornament.y;
            const dist = Math.hypot(dx, dy) || 1;
            ctx.fillStyle = '#d4a017';
            ctx.beginPath();
            ctx.arc(
                ornament.x + (dx / dist) * ornament.radius,
                ornament.y + (dy / dist) * ornament.radius,
                3,
                0,
                Math.PI * 2,
            );
            ctx.fill();
        }
    }
    ctx.restore();
}

export function Garland() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (!reducedMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = window.innerWidth;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, window.innerHeight);

        const {points, ornaments, bulbs} = buildGarland(width);
        for (const ornament of ornaments) {
            const anchor = points[ornament.anchor];
            if (!anchor) continue;
            ornament.x = anchor.x;
            ornament.y = anchor.y + ornament.stringLength;
        }
        const isDark = document.documentElement.classList.contains('dark');
        drawGarland(ctx, points, ornaments, bulbs, isDark, 0.5);
    }, [reducedMotion]);

    useEffect(() => {
        if (reducedMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf = 0;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let garland = buildGarland(width);
        let lastTime = performance.now();

        type DragTarget =
            | {kind: 'ball'; index: number}
            | {kind: 'rope'; index: number}
            | null;
        let drag: DragTarget = null;
        const lockedRemote = new Map<
            string,
            {kind: 'ball' | 'rope'; index: number}
        >();
        const lockedGhost = new Map<
            string,
            {kind: 'ball' | 'rope'; index: number}
        >();
        const pointerPos = {x: -9999, y: -9999, vx: 0, vy: 0};
        let lastPointer = {x: -9999, y: -9999, time: 0};

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            garland = buildGarland(width);
            if (drag) emitLocalGarlandDrag(null);
            drag = null;
            lockedRemote.clear();
            lockedGhost.clear();
        };

        const isFixed = (kind: 'rope' | 'ball', index: number) => {
            if (drag?.kind === kind && drag.index === index) return true;
            if (kind === 'rope') return garland.points[index]?.pinned ?? false;
            return false;
        };

        const satisfy = (
            ax: number,
            ay: number,
            bx: number,
            by: number,
            rest: number,
            aFixed: boolean,
            bFixed: boolean,
        ): [number, number, number, number] => {
            const dx = bx - ax;
            const dy = by - ay;
            const dist = Math.hypot(dx, dy) || 0.0001;
            const diff = (dist - rest) / dist;
            if (aFixed && bFixed) return [ax, ay, bx, by];
            if (aFixed) return [ax, ay, bx - dx * diff, by - dy * diff];
            if (bFixed) return [ax + dx * diff, ay + dy * diff, bx, by];
            const half = diff * 0.5;
            return [
                ax + dx * half,
                ay + dy * half,
                bx - dx * half,
                by - dy * half,
            ];
        };

        const step = (dt: number, seconds: number) => {
            const wind = windAt(seconds);
            const dtSub = dt / SUBSTEPS;
            const pageW = Math.max(document.documentElement.scrollWidth, width);
            const pageH = Math.max(
                document.documentElement.scrollHeight,
                height,
            );
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            for (const userId of [...lockedRemote.keys()]) {
                if (!remoteGarlandDrags.has(userId)) {
                    lockedRemote.delete(userId);
                }
            }
            for (const userId of remoteGarlandDrags.keys()) {
                if (lockedRemote.has(userId)) continue;
                const remote = remoteCursors.get(userId);
                if (!remote?.hasPosition) continue;
                const rx = remote.tx * pageW - scrollX;
                const ry = remote.ty * pageH - scrollY;
                let bestBall = -1;
                let bestBallDist = Infinity;
                garland.ornaments.forEach((ornament, index) => {
                    if (drag?.kind === 'ball' && drag.index === index) return;
                    const dist = Math.hypot(ornament.x - rx, ornament.y - ry);
                    if (dist < bestBallDist) {
                        bestBall = index;
                        bestBallDist = dist;
                    }
                });
                let bestRope = -1;
                let bestRopeDist = Infinity;
                garland.points.forEach((point, index) => {
                    if (point.pinned) return;
                    if (drag?.kind === 'rope' && drag.index === index) return;
                    const dist = Math.hypot(point.x - rx, point.y - ry);
                    if (dist < bestRopeDist) {
                        bestRope = index;
                        bestRopeDist = dist;
                    }
                });
                if (bestBall >= 0 && bestBallDist <= bestRopeDist) {
                    lockedRemote.set(userId, {kind: 'ball', index: bestBall});
                } else if (bestRope >= 0) {
                    lockedRemote.set(userId, {kind: 'rope', index: bestRope});
                }
            }
            const remoteGrabs: Array<{
                kind: 'ball' | 'rope';
                index: number;
                x: number;
                y: number;
            }> = [];
            for (const [userId, locked] of lockedRemote.entries()) {
                const remote = remoteCursors.get(userId);
                if (!remote?.hasPosition) continue;
                if (drag?.kind === locked.kind && drag.index === locked.index) {
                    continue;
                }
                const rx = remote.tx * pageW - scrollX;
                const ry = remote.ty * pageH - scrollY;
                if (
                    rx < -200 ||
                    rx > width + 200 ||
                    ry < -200 ||
                    ry > height + 200
                ) {
                    continue;
                }
                remoteGrabs.push({
                    kind: locked.kind,
                    index: locked.index,
                    x: rx,
                    y: ry,
                });
            }
            for (const ghostId of [...lockedGhost.keys()]) {
                if (!ghostCursors.has(ghostId)) {
                    lockedGhost.delete(ghostId);
                }
            }
            for (const ghost of ghostCursors.values()) {
                if (lockedGhost.has(ghost.id)) continue;
                const rx = ghost.x * pageW - scrollX;
                const ry = ghost.y * pageH - scrollY;
                if (
                    rx < -60 ||
                    rx > width + 60 ||
                    ry < -60 ||
                    ry > height + 60
                ) {
                    continue;
                }
                let bestBall = -1;
                let bestBallDist = Infinity;
                garland.ornaments.forEach((ornament, index) => {
                    if (drag?.kind === 'ball' && drag.index === index) return;
                    const dist = Math.hypot(ornament.x - rx, ornament.y - ry);
                    if (dist <= ornament.radius + 8 && dist < bestBallDist) {
                        bestBall = index;
                        bestBallDist = dist;
                    }
                });
                if (bestBall >= 0) {
                    lockedGhost.set(ghost.id, {
                        kind: 'ball',
                        index: bestBall,
                    });
                    continue;
                }
                let bestRope = -1;
                let bestRopeDist = Infinity;
                garland.points.forEach((point, index) => {
                    if (point.pinned) return;
                    if (drag?.kind === 'rope' && drag.index === index) return;
                    const dist = Math.hypot(point.x - rx, point.y - ry);
                    if (dist <= 12 && dist < bestRopeDist) {
                        bestRope = index;
                        bestRopeDist = dist;
                    }
                });
                if (bestRope >= 0) {
                    lockedGhost.set(ghost.id, {kind: 'rope', index: bestRope});
                }
            }
            const ghostGrabs: Array<{
                kind: 'ball' | 'rope';
                index: number;
                x: number;
                y: number;
            }> = [];
            for (const [ghostId, locked] of lockedGhost.entries()) {
                const ghost = ghostCursors.get(ghostId);
                if (!ghost) continue;
                if (drag?.kind === locked.kind && drag.index === locked.index) {
                    continue;
                }
                if (
                    remoteGrabs.some(
                        grab =>
                            grab.kind === locked.kind &&
                            grab.index === locked.index,
                    )
                ) {
                    continue;
                }
                const rx = ghost.x * pageW - scrollX;
                const ry = ghost.y * pageH - scrollY;
                if (
                    rx < -200 ||
                    rx > width + 200 ||
                    ry < -200 ||
                    ry > height + 200
                ) {
                    continue;
                }
                ghostGrabs.push({
                    kind: locked.kind,
                    index: locked.index,
                    x: rx,
                    y: ry,
                });
            }

            for (let s = 0; s < SUBSTEPS; s++) {
                garland.points.forEach((point, index) => {
                    if (isFixed('rope', index)) return;
                    const damp = Math.exp(-0.25 * dtSub);
                    const vx = (point.x - point.px) * damp;
                    const vy = (point.y - point.py) * damp;
                    point.px = point.x;
                    point.py = point.y;
                    const ax =
                        wind.x * 1.8 +
                        Math.sin(seconds * 1.4 + index * 0.4 + point.phase) *
                            22;
                    const ay =
                        GRAVITY +
                        Math.cos(seconds * 1.1 + index * 0.3 + point.phase) * 7;
                    point.x += vx + ax * dtSub * dtSub;
                    point.y += vy + ay * dtSub * dtSub;
                });

                garland.ornaments.forEach((ornament, index) => {
                    if (isFixed('ball', index)) return;
                    const damp = Math.exp(-0.35 * dtSub);
                    const vx = (ornament.x - ornament.px) * damp;
                    const vy = (ornament.y - ornament.py) * damp;
                    ornament.px = ornament.x;
                    ornament.py = ornament.y;
                    const ax =
                        wind.x * 2.8 +
                        Math.sin(seconds * 1.7 + ornament.phase) * 30;
                    const ay = GRAVITY + wind.y * 2;
                    ornament.x += vx + ax * dtSub * dtSub;
                    ornament.y += vy + ay * dtSub * dtSub;
                });

                if (drag?.kind === 'rope') {
                    const point = garland.points[drag.index];
                    if (point) {
                        point.x = pointerPos.x;
                        point.y = pointerPos.y;
                        point.px = pointerPos.x - pointerPos.vx * dtSub;
                        point.py = pointerPos.y - pointerPos.vy * dtSub;
                    }
                }
                if (drag?.kind === 'ball') {
                    const ornament = garland.ornaments[drag.index];
                    if (ornament) {
                        ornament.x = pointerPos.x;
                        ornament.y = pointerPos.y;
                        ornament.px = pointerPos.x - pointerPos.vx * dtSub;
                        ornament.py = pointerPos.y - pointerPos.vy * dtSub;
                    }
                }
                for (const grab of ghostGrabs) {
                    if (grab.kind === 'ball') {
                        const ornament = garland.ornaments[grab.index];
                        if (ornament) {
                            ornament.x = grab.x;
                            ornament.y = grab.y;
                            ornament.px = grab.x;
                            ornament.py = grab.y;
                        }
                    } else {
                        const point = garland.points[grab.index];
                        if (point) {
                            point.x = grab.x;
                            point.y = grab.y;
                            point.px = grab.x;
                            point.py = grab.y;
                        }
                    }
                }
                for (const grab of remoteGrabs) {
                    if (grab.kind === 'ball') {
                        const ornament = garland.ornaments[grab.index];
                        if (ornament) {
                            ornament.x = grab.x;
                            ornament.y = grab.y;
                            ornament.px = grab.x;
                            ornament.py = grab.y;
                        }
                    } else {
                        const point = garland.points[grab.index];
                        if (point) {
                            point.x = grab.x;
                            point.y = grab.y;
                            point.px = grab.x;
                            point.py = grab.y;
                        }
                    }
                }

                garland.points.forEach(point => {
                    if (point.pinned) {
                        point.x = point.mountX;
                        point.y = ANCHOR_Y;
                        point.px = point.x;
                        point.py = point.y;
                    }
                });

                for (let iter = 0; iter < ITERATIONS; iter++) {
                    for (let i = 1; i < garland.points.length; i++) {
                        const a = garland.points[i - 1];
                        const b = garland.points[i];
                        if (!a || !b) continue;
                        const [ax, ay, bx, by] = satisfy(
                            a.x,
                            a.y,
                            b.x,
                            b.y,
                            garland.restLength,
                            isFixed('rope', i - 1),
                            isFixed('rope', i),
                        );
                        a.x = ax;
                        a.y = ay;
                        b.x = bx;
                        b.y = by;
                    }
                    for (let i = 0; i < garland.ornaments.length; i++) {
                        const ornament = garland.ornaments[i];
                        const anchor = garland.points[ornament?.anchor ?? -1];
                        if (!ornament || !anchor) continue;
                        const [ax, ay, bx, by] = satisfy(
                            anchor.x,
                            anchor.y,
                            ornament.x,
                            ornament.y,
                            ornament.stringLength,
                            isFixed('rope', ornament.anchor),
                            isFixed('ball', i),
                        );
                        anchor.x = ax;
                        anchor.y = ay;
                        ornament.x = bx;
                        ornament.y = by;
                    }
                    garland.points.forEach(point => {
                        if (point.pinned) {
                            point.x = point.mountX;
                            point.y = ANCHOR_Y;
                        }
                    });
                    if (drag?.kind === 'rope') {
                        const point = garland.points[drag.index];
                        if (point) {
                            point.x = pointerPos.x;
                            point.y = pointerPos.y;
                        }
                    }
                    if (drag?.kind === 'ball') {
                        const ornament = garland.ornaments[drag.index];
                        if (ornament) {
                            ornament.x = pointerPos.x;
                            ornament.y = pointerPos.y;
                        }
                    }
                    for (const grab of ghostGrabs) {
                        if (grab.kind === 'ball') {
                            const ornament = garland.ornaments[grab.index];
                            if (ornament) {
                                ornament.x = grab.x;
                                ornament.y = grab.y;
                            }
                        } else {
                            const point = garland.points[grab.index];
                            if (point) {
                                point.x = grab.x;
                                point.y = grab.y;
                            }
                        }
                    }
                    for (const grab of remoteGrabs) {
                        if (grab.kind === 'ball') {
                            const ornament = garland.ornaments[grab.index];
                            if (ornament) {
                                ornament.x = grab.x;
                                ornament.y = grab.y;
                            }
                        } else {
                            const point = garland.points[grab.index];
                            if (point) {
                                point.x = grab.x;
                                point.y = grab.y;
                            }
                        }
                    }
                }
            }
        };

        const frame = (now: number) => {
            const dt = Math.min(0.033, Math.max(0, (now - lastTime) / 1000));
            lastTime = now;
            step(dt, now / 1000);

            ctx.clearRect(0, 0, width, height);
            const isDark = document.documentElement.classList.contains('dark');
            drawGarland(
                ctx,
                garland.points,
                garland.ornaments,
                garland.bulbs,
                isDark,
                now / 1000,
            );

            raf = requestAnimationFrame(frame);
        };

        const hitTest = (x: number, y: number): DragTarget => {
            let bestBallIndex = -1;
            let bestBallDist = Infinity;
            garland.ornaments.forEach((ornament, index) => {
                const dist = Math.hypot(ornament.x - x, ornament.y - y);
                if (dist <= ornament.radius + 9 && dist < bestBallDist) {
                    bestBallIndex = index;
                    bestBallDist = dist;
                }
            });
            if (bestBallIndex >= 0) {
                return {kind: 'ball', index: bestBallIndex};
            }

            let bestRopeIndex = -1;
            let bestRopeDist = Infinity;
            garland.points.forEach((point, index) => {
                if (point.pinned) return;
                const dist = Math.hypot(point.x - x, point.y - y);
                if (dist <= 11 && dist < bestRopeDist) {
                    bestRopeIndex = index;
                    bestRopeDist = dist;
                }
            });
            if (bestRopeIndex >= 0) {
                return {kind: 'rope', index: bestRopeIndex};
            }
            return null;
        };

        const updatePointerVelocity = (event: PointerEvent) => {
            const now = performance.now();
            const dt = Math.max(1, now - lastPointer.time);
            pointerPos.vx =
                pointerPos.vx * 0.6 +
                ((event.clientX - lastPointer.x) / dt) * 1000 * 0.4;
            pointerPos.vy =
                pointerPos.vy * 0.6 +
                ((event.clientY - lastPointer.y) / dt) * 1000 * 0.4;
            pointerPos.x = event.clientX;
            pointerPos.y = event.clientY;
            lastPointer = {x: event.clientX, y: event.clientY, time: now};
        };

        const onPointerDown = (event: PointerEvent) => {
            const hit = hitTest(event.clientX, event.clientY);
            if (!hit) return;
            drag = hit;
            emitLocalGarlandDrag(hit);
            updatePointerVelocity(event);
            document.body.style.cursor = 'grabbing';
            event.stopPropagation();
            event.preventDefault();
        };

        const onPointerMove = (event: PointerEvent) => {
            updatePointerVelocity(event);
            if (!drag) {
                document.body.style.cursor = hitTest(
                    event.clientX,
                    event.clientY,
                )
                    ? 'grab'
                    : '';
            }
        };

        const onPointerUp = () => {
            if (drag) emitLocalGarlandDrag(null);
            drag = null;
            document.body.style.cursor = '';
        };

        const onPointerLeave = () => {
            if (!drag) document.body.style.cursor = '';
        };

        resize();
        window.addEventListener('pointerdown', onPointerDown, true);
        window.addEventListener('pointermove', onPointerMove, {
            passive: true,
        });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        document.documentElement.addEventListener(
            'pointerleave',
            onPointerLeave,
        );
        window.addEventListener('resize', resize);
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointerdown', onPointerDown, true);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            document.documentElement.removeEventListener(
                'pointerleave',
                onPointerLeave,
            );
            window.removeEventListener('resize', resize);
            document.body.style.cursor = '';
            ctx.clearRect(0, 0, width, height);
        };
    }, [reducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            data-testid="garland"
            className="pointer-events-none fixed inset-0 z-[101] h-full w-full"
        />
    );
}

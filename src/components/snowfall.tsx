import {useEffect, useRef} from 'react';
import {useReducedMotion} from '@/lib/snowfall';

interface Flake {
    x: number;
    y: number;
    size: number;
    depth: number;
    fallSpeed: number;
    swayAmp: number;
    swayFreq: number;
    phase: number;
    opacity: number;
}

const TAU = Math.PI * 2;

function rand(min: number, max: number) {
    return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function createFlake(width: number, height: number, anywhere = false): Flake {
    const depth = Math.pow(Math.random(), 0.7) * 0.75 + 0.25;
    const size = clamp(Math.round(1.5 + depth * 3.5 + rand(-0.4, 0.4)), 2, 5);
    const fallSpeed = 26 + depth * 82 + Math.random() * 20;
    const swayAmp = 9 + depth * 24 + Math.random() * 10;
    const swayFreq = 0.6 + Math.random() * 1.7;
    const r = Math.random();
    const opacity =
        r < 0.12
            ? 0.3 + depth * 0.3
            : r < 0.55
              ? 0.5 + depth * 0.35
              : 0.8 + depth * 0.2;
    return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : rand(-height * 0.25, -8),
        size,
        depth,
        fallSpeed,
        swayAmp,
        swayFreq,
        phase: Math.random() * TAU,
        opacity: Math.min(opacity, 1),
    };
}

function targetCount(width: number, height: number) {
    const area = width * height;
    return Math.min(180, Math.max(30, Math.round(area / 11000)));
}

function windAt(seconds: number): {x: number; y: number} {
    const baseX =
        Math.sin(seconds * 0.13) * 34 +
        Math.sin(seconds * 0.071 + 1.3) * 26 +
        Math.sin(seconds * 0.31 + 0.5) * 12;
    const gustPhase = Math.sin(seconds * 0.021 + 1.2);
    const gust = Math.sign(gustPhase) * Math.pow(Math.abs(gustPhase), 5) * 58;
    const windY = Math.sin(seconds * 0.19 + 0.8) * 6;
    const turbulence =
        Math.sin(seconds * 1.7 + 0.3) * 6 + Math.sin(seconds * 2.9 + 2.1) * 3;
    return {x: baseX + gust + turbulence, y: windY};
}

function drawFlake(
    ctx: CanvasRenderingContext2D,
    flake: Flake,
    x: number,
    y: number,
    isDark: boolean,
) {
    const s = flake.size;
    ctx.save();
    ctx.globalAlpha = flake.opacity;

    if (!isDark) {
        ctx.fillStyle = 'rgba(27,27,27,0.22)';
        ctx.fillRect(
            Math.round(x - s / 2) + 1,
            Math.round(y - s / 2) + 1,
            s,
            s,
        );
    }

    ctx.fillStyle = isDark ? '#ffffff' : '#fdfdfb';
    ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), s, s);

    ctx.restore();
}

export function Snowfall() {
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
        const height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.classList.contains('dark');
        const count = targetCount(width, height);
        for (let i = 0; i < count; i++) {
            const flake = createFlake(width, height, true);
            const x = flake.x + Math.sin(flake.phase) * flake.swayAmp * 0.4;
            drawFlake(ctx, flake, x, flake.y, isDark);
        }
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
        let flakes: Flake[] = [];
        let lastTime = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const target = targetCount(width, height);
            if (flakes.length < target) {
                while (flakes.length < target) {
                    flakes.push(createFlake(width, height, true));
                }
            } else {
                flakes = flakes.slice(0, target);
            }
        };

        const frame = (now: number) => {
            const dt = Math.min(0.033, Math.max(0, (now - lastTime) / 1000));
            lastTime = now;
            const seconds = now / 1000;
            const wind = windAt(seconds);
            const isDark = document.documentElement.classList.contains('dark');

            ctx.clearRect(0, 0, width, height);

            for (const flake of flakes) {
                const sway =
                    Math.sin(seconds * flake.swayFreq + flake.phase) *
                    flake.swayAmp;
                const windX = wind.x * (0.25 + flake.depth * 0.75);
                const windY = wind.y * flake.depth;

                flake.y += (flake.fallSpeed + windY) * dt;
                flake.x += windX * dt;
                const drawX = flake.x + sway * 0.35;

                if (flake.y > height + 12) {
                    Object.assign(flake, createFlake(width, height));
                    continue;
                }
                if (flake.x > width + 12) flake.x = -12;
                if (flake.x < -12) flake.x = width + 12;

                drawFlake(ctx, flake, drawX, flake.y, isDark);
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
        };
    }, [reducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            data-testid="snowfall"
            className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
        />
    );
}

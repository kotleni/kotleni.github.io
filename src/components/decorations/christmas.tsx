import React, {useEffect, useRef, useState} from 'react';

const getGlobalWind = (time: number): number =>
    Math.sin(time * 0.0002) * 0.6 + Math.sin(time * 0.0005) * 0.2;

class Snowflake {
    x: number;
    y: number;
    vx = 0;
    vy: number;
    radius: number;
    baseVx: number;
    opacity: number;
    fallSpeed: number;
    opacityStr: string;
    path: Path2D;

    constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        this.radius = Math.random() * 3 + 1;
        this.baseVx = (Math.random() - 0.5) * 1.5;
        this.fallSpeed = Math.random() * 1.5 + 1;
        this.vy = Math.random() * 1.5 + 1;

        this.opacity = Math.random() * 0.5 + 0.3;
        this.opacityStr = `rgba(222,222,222,${this.opacity})`;

        const p = new Path2D();
        p.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.path = p;
    }

    update(w: number, h: number, scrollVel: number, wind: number, dt: number) {
        this.vy -= scrollVel * 0.05 * dt;

        const targetVx = this.baseVx + wind * 3;
        this.vx += (targetVx - this.vx) * 0.1 * dt;
        this.vy += (this.fallSpeed - this.vy) * 0.05 * dt;

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        if (this.y > h + 10) {
            this.y = -10;
            this.x = Math.random() * w;
        } else if (this.y < -10 && scrollVel > 0) {
            this.y = h + 10;
            this.x = Math.random() * w;
        }

        if (this.x > w + 10) this.x = -10;
        else if (this.x < -10) this.x = w + 10;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.opacityStr;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fill(this.path);
        ctx.restore();
    }
}

export const Snowflakes = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const flakes = useRef<Snowflake[]>([]);
    const requestRef = useRef(0);
    const lastScrollY = useRef(0);
    const fpsRef = useRef(0);
    const lastFrame = useRef(0);
    const [showFps, setShowFps] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'f') setShowFps(s => !s);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        if (flakes.current.length === 0) {
            for (let i = 0; i < 150; i++) {
                flakes.current.push(new Snowflake(canvas.width, canvas.height));
            }
        }

        const loop = (t: number) => {
            const now = t;
            const dt = lastFrame.current
                ? (now - lastFrame.current) / 16.666
                : 1;
            lastFrame.current = now;

            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            if (lastFrame.current) {
                fpsRef.current = Math.round(1000 / (t - lastFrame.current));
            }
            lastFrame.current = t;

            const scrollY = window.scrollY;
            const scrollVel = Math.max(
                Math.min(scrollY - lastScrollY.current, 18),
                -18,
            );
            lastScrollY.current = scrollY;

            const wind = getGlobalWind(t);

            const arr = flakes.current;
            for (let i = 0; i < arr.length; i++) {
                const f = arr[i];
                f.update(w, h, scrollVel, wind, dt);
                f.draw(ctx);
            }

            if (showFps) {
                ctx.fillStyle = '#fff';
                ctx.font = '14px monospace';
                ctx.fillText(`${fpsRef.current} FPS`, 10, 20);
                ctx.fillText(`Flakes: ${arr.length}`, 10, 40);
            }

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [showFps]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
        />
    );
};

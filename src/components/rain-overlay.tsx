import {useEffect, useRef} from 'react';

interface Orb {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    alpha: number;
    hue: number;
}

const PALETTE_LIGHT: [number, number, number][] = [
    [180, 160, 220],
    [220, 180, 170],
    [170, 200, 180],
    [210, 195, 165],
];

const PALETTE_DARK: [number, number, number][] = [
    [140, 130, 180],
    [180, 140, 140],
    [130, 160, 150],
    [170, 155, 130],
];

export default function RainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d', {alpha: true});

        if (!context) {
            return;
        }

        const orbs: Orb[] = [];
        const maxOrbs = 14;
        let width = 0;
        let height = 0;
        let frameId = 0;

        const isDark = () =>
            document.documentElement.classList.contains('dark');

        const palette = () => (isDark() ? PALETTE_DARK : PALETTE_LIGHT);

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const spawnOrb = (orb: Orb) => {
            orb.x = Math.random() * width;
            orb.y = Math.random() * height;
            orb.r = Math.random() * 40 + 20;
            orb.vx = (Math.random() - 0.5) * 0.3;
            orb.vy = (Math.random() - 0.5) * 0.2 - 0.05;
            orb.alpha = Math.random() * 0.12 + 0.04;
            const colors = palette();
            const c =
                colors[Math.floor(Math.random() * colors.length)] ?? colors[0]!;
            orb.hue = c[0]!;
        };

        const loop = () => {
            context.clearRect(0, 0, width, height);

            for (const orb of orbs) {
                orb.x += orb.vx;
                orb.y += orb.vy;

                if (orb.x < -orb.r) orb.x = width + orb.r;
                if (orb.x > width + orb.r) orb.x = -orb.r;
                if (orb.y < -orb.r) orb.y = height + orb.r;
                if (orb.y > height + orb.r) orb.y = -orb.r;

                const colors = palette();
                const colorsIdx = orbs.indexOf(orb) % colors.length;
                const c = colors[colorsIdx] ?? colors[0]!;

                const gradient = context.createRadialGradient(
                    orb.x,
                    orb.y,
                    0,
                    orb.x,
                    orb.y,
                    orb.r,
                );
                gradient.addColorStop(
                    0,
                    `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${orb.alpha})`,
                );
                gradient.addColorStop(1, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0)`);

                context.beginPath();
                context.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
                context.fillStyle = gradient;
                context.fill();
            }

            frameId = window.requestAnimationFrame(loop);
        };

        resize();

        for (let i = 0; i < maxOrbs; i += 1) {
            const orb: Orb = {
                x: 0,
                y: 0,
                r: 0,
                vx: 0,
                vy: 0,
                alpha: 0,
                hue: 0,
            };
            spawnOrb(orb);
            orbs.push(orb);
        }

        window.addEventListener('resize', resize, {passive: true});
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen opacity-100"
        />
    );
}

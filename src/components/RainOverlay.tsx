import {useEffect, useRef} from 'react';

interface Drop {
    x: number;
    y: number;
    l: number;
    s: number;
}

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

        const drops: Drop[] = [];
        const maxDrops = 32;
        let width = 0;
        let height = 0;
        let wind = 0;
        let time = 0;
        let frameId = 0;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const resetDrop = (drop: Drop) => {
            drop.x = Math.random() * (width + 400) - 200;
            drop.y = -drop.l;
        };

        const loop = () => {
            context.clearRect(0, 0, width, height);
            context.strokeStyle = 'rgba(174, 194, 224, 0.6)';
            context.lineWidth = 1.2;
            context.lineCap = 'round';

            time += 0.005;
            wind = Math.sin(time) * 4 + 3;

            context.beginPath();

            for (const drop of drops) {
                const windFactor = wind * (drop.s / 10);

                context.moveTo(drop.x, drop.y);
                context.lineTo(drop.x + windFactor, drop.y + drop.l);

                drop.y += drop.s;
                drop.x += windFactor;

                if (drop.y > height || drop.x > width || drop.x < -200) {
                    resetDrop(drop);
                }
            }

            context.stroke();
            frameId = window.requestAnimationFrame(loop);
        };

        resize();

        for (let i = 0; i < maxDrops; i += 1) {
            drops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                l: Math.random() * 20 + 10,
                s: Math.random() * 12 + 10,
            });
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
            className="pointer-events-none fixed inset-0 z-[99999] h-screen w-screen mix-blend-multiply opacity-15"
        />
    );
}

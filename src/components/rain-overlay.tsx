import {useEffect, useRef} from 'react';

interface Drop {
    x: number;
    y: number;
    length: number;
    speed: number;
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
        const maxDrops = 90;
        let width = 0;
        let height = 0;
        let frameId = 0;

        const isDark = () =>
            document.documentElement.classList.contains('dark');

        const color = () =>
            isDark() ? 'rgba(190, 205, 235, 0.4)' : 'rgba(120, 145, 190, 0.35)';

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const spawnDrop = (drop: Drop) => {
            drop.x = Math.random() * (width + 400) - 200;
            drop.y = Math.random() * height - height;
            drop.length = Math.random() * 18 + 8;
            drop.speed = Math.random() * 12 + 8;
        };

        const loop = () => {
            context.clearRect(0, 0, width, height);

            context.strokeStyle = color();
            context.lineWidth = 1.4;
            context.lineCap = 'round';
            context.beginPath();

            for (const drop of drops) {
                drop.y += drop.speed;
                drop.x -= drop.speed * 0.25;

                context.moveTo(drop.x, drop.y);
                context.lineTo(
                    drop.x + drop.length * 0.2,
                    drop.y - drop.length,
                );

                if (drop.y > height + drop.length || drop.x < -200) {
                    spawnDrop(drop);
                }
            }

            context.stroke();
            frameId = window.requestAnimationFrame(loop);
        };

        resize();

        for (let i = 0; i < maxDrops; i += 1) {
            const drop: Drop = {x: 0, y: 0, length: 0, speed: 0};
            spawnDrop(drop);
            drops.push(drop);
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

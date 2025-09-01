'use client';

import React, {useRef, useEffect} from 'react';

interface Pos {
    x: number;
    y: number;
}

interface Box {
    w: number;
    h: number;
}

interface Object {
    name: string;
    pos: Pos;
    bounds: Box;
}

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const objects: Object[] = [
            {name: 'Box1', pos: {x: 32, y: 32}, bounds: {w: 120, h: 120}},
        ];

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Render objects
            objects.forEach(obj => {
                ctx.fillStyle = 'blue';
                ctx.fillRect(obj.pos.x, obj.pos.y, obj.bounds.w, obj.bounds.h);
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{display: 'block', background: '#111111'}}
        />
    );
};

export default function PhysboxPage() {
    return <Canvas />;
}

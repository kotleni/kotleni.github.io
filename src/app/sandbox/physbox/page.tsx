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

function isPointCollideWithObject(pos: Pos, obj: Object): boolean {
    const x2 = obj.pos.x + obj.bounds.w;
    const y2 = obj.pos.y + obj.bounds.h;
    return pos.x >= obj.pos.x && pos.y >= obj.pos.y && pos.x < x2 && pos.y < y2;
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

        let grabbedObj: Object | undefined = undefined;
        let grabOffset: Pos = {x: 0, y: 0};

        const mouseDown = (event: MouseEvent) => {
            objects.forEach(obj => {
                if (
                    isPointCollideWithObject(
                        {x: event.clientX, y: event.clientY},
                        obj,
                    )
                ) {
                    grabOffset = {
                        x: Math.floor(event.clientX - obj.pos.x),
                        y: Math.floor(event.clientY - obj.pos.y),
                    };
                    grabbedObj = obj;
                }
            });
        };

        const mouseUp = (event: MouseEvent) => {
            grabbedObj = undefined;
        };

        const mouseMove = (event: MouseEvent) => {
            if (grabbedObj) {
                const mx = Math.floor(event.clientX);
                const my = Math.floor(event.clientY);
                grabbedObj.pos = {x: mx - grabOffset.x, y: my - grabOffset.y};
            }
        };

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
        window.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', mouseMove);
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('mousemove', mouseMove);
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

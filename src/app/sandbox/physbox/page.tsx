'use client';

import React, {useRef, useEffect} from 'react';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const size = 32;
        const halfSize = size / 2;

        const vertices: {x: number; y: number; z: number}[] = [
            {x: -halfSize, y: -halfSize, z: -halfSize},
            {x: halfSize, y: -halfSize, z: -halfSize},
            {x: halfSize, y: halfSize, z: -halfSize},
            {x: -halfSize, y: halfSize, z: -halfSize},
            {x: -halfSize, y: -halfSize, z: halfSize},
            {x: halfSize, y: -halfSize, z: halfSize},
            {x: halfSize, y: halfSize, z: halfSize},
            {x: -halfSize, y: halfSize, z: halfSize},
        ];

        const edges = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 4],
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7],
        ];

        let angleX = 0;
        let angleY = 0;
        const cubePosition = {x: 0, y: 0};
        const velocity = {x: 2, y: 1.5};
        const focalLength = 300;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cubePosition.x = canvas.width / 2;
            cubePosition.y = canvas.height / 2;
        };

        const project = (point: {x: number; y: number; z: number}) => {
            const scale = focalLength / (focalLength + point.z);
            return {
                x: point.x * scale + cubePosition.x,
                y: point.y * scale + cubePosition.y,
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#0077ff';
            ctx.lineWidth = 2;

            angleX += 0.007;
            angleY += 0.007;

            cubePosition.x += velocity.x;
            cubePosition.y += velocity.y;

            if (
                cubePosition.x - halfSize < 0 ||
                cubePosition.x + halfSize > canvas.width
            ) {
                velocity.x *= -1;
            }
            if (
                cubePosition.y - halfSize < 0 ||
                cubePosition.y + halfSize > canvas.height
            ) {
                velocity.y *= -1;
            }

            const rotatedVertices = vertices.map(v => {
                const cosX = Math.cos(angleX);
                const sinX = Math.sin(angleX);
                const cosY = Math.cos(angleY);
                const sinY = Math.sin(angleY);

                const y1 = v.y * cosX - v.z * sinX;
                const z1 = v.y * sinX + v.z * cosX;
                const x1 = v.x * cosY + z1 * sinY;
                const z2 = -v.x * sinY + z1 * cosY;

                return {x: x1, y: y1, z: z2};
            });

            const projectedVertices = rotatedVertices.map(project);

            edges.forEach(([start, end]) => {
                const p1 = projectedVertices[start];
                const p2 = projectedVertices[end];
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
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

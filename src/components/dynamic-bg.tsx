'use client';

import React, {useRef, useEffect} from 'react';

// --- Configuration (Simple & Stupid) ---
const GRID_SPACING = 40;

const COLORS = {
    light: {
        background: '#f1f5f9', // slate-100
        grid: 'rgba(0, 80, 200, 0.12)',
    },
    dark: {
        background: '#0f172a', // slate-900
        grid: 'rgba(59, 130, 246, 0.1)',
    },
};

export default function DynamicBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // This function draws our simple, single-layer grid. That's it.
        const drawGrid = () => {
            const theme = document.documentElement.classList.contains('dark')
                ? 'dark'
                : 'light';
            const themeColors = COLORS[theme];

            // Set canvas size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Fill background (important for theme switching)
            ctx.fillStyle = themeColors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the grid lines
            ctx.strokeStyle = themeColors.grid;
            ctx.lineWidth = 1;
            ctx.beginPath();

            // Vertical lines
            for (let x = 0; x < canvas.width; x += GRID_SPACING) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += GRID_SPACING) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }

            ctx.stroke();
        };

        // Draw the grid initially
        drawGrid();

        // Redraw the grid only when the window is resized
        const handleResize = () => drawGrid();
        window.addEventListener('resize', handleResize);

        // Also check for theme changes to redraw with correct colors
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    drawGrid();
                }
            });
        });
        observer.observe(document.documentElement, {attributes: true});

        // Cleanup when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="
        pointer-events-none fixed inset-0 z-[-1]
        [mask-image:linear-gradient(to_bottom,white_40%,transparent_85%)]
        [-webkit-mask-image:linear-gradient(to_bottom,white_40%,transparent_85%)]
      "
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

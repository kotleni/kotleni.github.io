import { useEffect, useRef, useState } from "react";
import Perlin from "../../perlin";
import "./DottedBackground.module.scss";

const SCALE = 200;
const LENGTH = 10;
const SPACING = 15;

export default function CoolBackgroundCanvas() {
    const [noise] = useState(new Perlin(Math.random()));

    function getForceOnPoint(x: number, y: number, z: number) {
        return (noise.perlin3(x / SCALE, y / SCALE, z) - 0.5) * 2 * (Math.PI * 2)
    }

    const [existingPoints, setExistingPoints] = useState(new Set<string>);
    const [points, setPoints] = useState<{ x: number, y: number, opacity: number }[]>([]);

    function addPoints(w: number, h: number) {
        const points2: { x: number, y: number, opacity: number }[] = [];

        for (let x = -SPACING / 2; x < w + SPACING; x += SPACING) {
            for (let y = -SPACING / 2; y < h + SPACING; y += SPACING) {
                const id = `${x}-${y}`
                if (existingPoints.has(id))
                    continue
                setExistingPoints(existingPoints.add(id));

                points2.push({ x, y, opacity: Math.random() * 0.5 + 0.5 })
            }
        }

        setPoints(points2);
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        function draw(context: CanvasRenderingContext2D) {
            if (context) {
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);

                const t = +new Date() / 10000

                for (const p of points) {
                    const radius = 1;
                    const {x, y} = p;
                    const rad = getForceOnPoint(x, y, t);
                    const length = (noise.perlin3(x / SCALE, y / SCALE, t * 2) + 0.5) * LENGTH;
                    const nx = x + Math.cos(rad) * length;
                    const ny = y + Math.sin(rad) * length;

                    const alpha = ((Math.abs(Math.cos(rad)) * 0.8 + 0.2) * p.opacity);
                    context.fillStyle = `rgba(200, 200, 200, ${alpha})`;

                    context.beginPath();
                    context.arc(
                        nx,
                        ny,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    context.fill();
                }

                // Continue animation
                frameRef.current = requestAnimationFrame(() => draw(context));
            }
        }

        if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");

            if (context) {
                const parent = context.canvas.parentElement!;
                context.canvas.width = parent.offsetWidth;
                context.canvas.height = parent.offsetHeight;

                if(points.length <= 0)
                    addPoints(context.canvas.width, context.canvas.height);

                console.log("WWWWW")

                frameRef.current = requestAnimationFrame(() => draw(context));
            }
        }

        return () => cancelAnimationFrame(frameRef.current);
    }, [noise, points, existingPoints]);

    return <canvas className="canvas-dotted-background" ref={canvasRef} />;
}
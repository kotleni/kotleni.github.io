import React, {useEffect, useRef} from 'react';

class Snowflake {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseVx: number;
    baseVy: number;
    opacity: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.baseVx = Math.random() * 2 + 0.5;
        this.baseVy = Math.random() * 1.5 + 1;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update(width: number, height: number, scrollVelocity: number) {
        this.vy -= scrollVelocity * 0.05;

        this.vx += (this.baseVx - this.vx) * 0.05;
        this.vy += (this.baseVy - this.vy) * 0.05;

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > height + 10) {
            this.y = -10;
            this.x = Math.random() * width;
        } else if (this.y < -10 && scrollVelocity > 0) {
            // allow reset from top if pushed up by scroll
            this.y = height + 10;
            this.x = Math.random() * width;
        }

        if (this.x > width + 10) {
            this.x = -10;
        } else if (this.x < -10) {
            this.x = width + 10;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(222, 222, 222, ${this.opacity})`;
        ctx.fill();
    }
}

export const Snowflakes = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const flakes = useRef<Snowflake[]>([]);
    const lastScrollY = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        lastScrollY.current = window.scrollY;

        if (flakes.current.length === 0) {
            for (let i = 0; i < 150; i++) {
                flakes.current.push(new Snowflake(canvas.width, canvas.height));
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentScrollY = window.scrollY;
            const scrollVelocity = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;

            flakes.current.forEach(f => {
                f.update(canvas.width, canvas.height, scrollVelocity);
                f.draw(ctx);
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
        />
    );
};

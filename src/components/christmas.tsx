import React, {useEffect, useRef} from 'react';

const getGlobalWind = (time: number): number => {
    return Math.sin(time * 0.0002) * 0.6 + Math.sin(time * 0.0005) * 0.2;
};

const LIGHT_OPTS = {
    SEGMENT_LENGTH: 20,
    GRAVITY: 0.4,
    DRAG: 0.96,
    LIGHT_INTERVAL: 3,
    PHYSICS_ACCURACY: 4,
    COLORS: ['#ff3333', '#33ff33', '#3388ff', '#fa7733', '#2177ff'],
};

class LightPoint {
    x: number;
    y: number;
    oldx: number;
    oldy: number;
    pinned: boolean;
    color?: string;

    constructor(x: number, y: number, pinned: boolean = false, color?: string) {
        this.x = x;
        this.y = y;
        this.oldx = x;
        this.oldy = y;
        this.pinned = pinned;
        this.color = color;
    }

    update(windForce: number) {
        if (this.pinned) return;

        const vx = (this.x - this.oldx) * LIGHT_OPTS.DRAG;
        const vy = (this.y - this.oldy) * LIGHT_OPTS.DRAG;

        this.oldx = this.x;
        this.oldy = this.y;

        this.x += vx + windForce;
        this.y += vy + LIGHT_OPTS.GRAVITY;
    }
}

class LightStick {
    p1: LightPoint;
    p2: LightPoint;
    length: number;

    constructor(p1: LightPoint, p2: LightPoint) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = LIGHT_OPTS.SEGMENT_LENGTH;
    }

    update() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return;

        const difference = this.length - distance;
        const percent = difference / distance / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;

        if (!this.p1.pinned) {
            this.p1.x -= offsetX;
            this.p1.y -= offsetY;
        }
        if (!this.p2.pinned) {
            this.p2.x += offsetX;
            this.p2.y += offsetY;
        }
    }
}

export const Christmas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const points = useRef<LightPoint[]>([]);
    const sticks = useRef<LightStick[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initRopes(canvas.width);
        };

        const createRope = (startX: number) => {
            const totalSegments = 16;
            const startY = 0;
            const prevPointCount = points.current.length;

            for (let i = 0; i <= totalSegments; i++) {
                const pinned = i === 0;
                let color = undefined;
                if (!pinned && i % LIGHT_OPTS.LIGHT_INTERVAL === 0) {
                    color =
                        LIGHT_OPTS.COLORS[
                            Math.floor(Math.random() * LIGHT_OPTS.COLORS.length)
                        ];
                }
                const p = new LightPoint(
                    startX,
                    startY + i * LIGHT_OPTS.SEGMENT_LENGTH,
                    pinned,
                    color,
                );
                points.current.push(p);
                if (i > 0) {
                    sticks.current.push(
                        new LightStick(
                            points.current[prevPointCount + i - 1],
                            p,
                        ),
                    );
                }
            }
        };

        const initRopes = (width: number) => {
            points.current = [];
            sticks.current = [];
            createRope(width * 0.4);
            createRope(width * 0.6);
        };

        const animate = (time: number) => {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const rawWind = getGlobalWind(time);
            const wireWindForce = rawWind * 0.12;

            points.current.forEach(p => p.update(wireWindForce));
            for (let i = 0; i < LIGHT_OPTS.PHYSICS_ACCURACY; i++) {
                sticks.current.forEach(s => s.update());
            }

            const scrollY = window.scrollY;
            ctx.translate(0, -scrollY);

            if (scrollY < 1000) {
                ctx.beginPath();
                ctx.strokeStyle = '#1a3311';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                sticks.current.forEach(s => {
                    ctx.moveTo(s.p1.x, s.p1.y);
                    ctx.lineTo(s.p2.x, s.p2.y);
                });
                ctx.stroke();

                points.current.forEach(p => {
                    if (p.color) {
                        ctx.fillStyle = '#222';
                        ctx.fillRect(p.x - 3, p.y - 6, 6, 6);

                        ctx.shadowBlur = 15;
                        ctx.shadowColor = p.color;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y + 6, 7, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        ctx.fillStyle = 'rgba(255,255,255,0.6)';
                        ctx.beginPath();
                        ctx.arc(p.x - 2, p.y + 4, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        requestRef.current = requestAnimationFrame(animate);

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

class Snowflake {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseVx: number;
    opacity: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.baseVx = (Math.random() - 0.5) * 1.5;
        this.vy = Math.random() * 1.5 + 1;
        this.vx = 0;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update(
        width: number,
        height: number,
        scrollVelocity: number,
        windForce: number,
    ) {
        this.vy -= scrollVelocity * 0.05;

        const targetVx = this.baseVx + windForce * 3;

        this.vx += (targetVx - this.vx) * 0.1;

        const baseFallSpeed = Math.random() * 1.5 + 1;
        this.vy += (baseFallSpeed - this.vy) * 0.05;

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > height + 10) {
            this.y = -10;
            this.x = Math.random() * width;
        } else if (this.y < -10 && scrollVelocity > 0) {
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

        if (flakes.current.length === 0) {
            for (let i = 0; i < 150; i++) {
                flakes.current.push(new Snowflake(canvas.width, canvas.height));
            }
        }

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentScrollY = window.scrollY;
            const scrollVelocity = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;

            const rawWind = getGlobalWind(time);

            flakes.current.forEach(f => {
                f.update(canvas.width, canvas.height, scrollVelocity, rawWind);
                f.draw(ctx);
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        animate(0);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
        />
    );
};

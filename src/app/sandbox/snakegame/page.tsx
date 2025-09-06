'use client';

import React, {useRef, useEffect} from 'react';

// A simple 2D Vector class
class Vec {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vec): Vec {
        return new Vec(this.x + v.x, this.y + v.y);
    }

    multiply(scalar: number): Vec {
        return new Vec(this.x * scalar, this.y * scalar);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalized(): Vec {
        const mag = this.magnitude();
        return mag === 0 ? new Vec(0, 0) : new Vec(this.x / mag, this.y / mag);
    }

    distance(to: Vec): number {
        const dx = this.x - to.x;
        const dy = this.y - to.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

interface SnakePart {
    pos: Vec;
}

interface Food {
    pos: Vec;
    radius: number;
}

interface Particle {
    pos: Vec;
    vel: Vec;
    life: number; // Will be used as opacity
    radius: number;
    color: string;
}

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastInputPos = useRef<Vec>(new Vec(0, 0));
    const direction = useRef<Vec>(new Vec(1, 0));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let tick = 0;
        let mousePos = new Vec(window.innerWidth / 2, window.innerHeight / 2);

        const snakeParts: SnakePart[] = [];
        const foods: Food[] = [];
        const particles: Particle[] = [];

        const FOOD_RADIUS = 12;
        const SNAKE_PART_RADIUS = 12;
        const MOVEMENT_THRESHOLD = 5;

        // Initialize the snake at the start
        const initSnake = () => {
            snakeParts.push({pos: new Vec(mousePos.x, mousePos.y)});
            for (let i = 0; i < 15; i++) {
                snakeParts.push({pos: new Vec(mousePos.x, mousePos.y)});
            }
        };

        const spawnFood = (amount: number) => {
            for (let i = 0; i < amount; i++) {
                const margin = 50;
                const x = Math.random() * (canvas.width - margin * 2) + margin;
                const y = Math.random() * (canvas.height - margin * 2) + margin;
                foods.push({pos: new Vec(x, y), radius: FOOD_RADIUS});
            }
        };

        const createEatParticles = (position: Vec) => {
            for (let i = 0; i < 25; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 1;
                particles.push({
                    pos: new Vec(position.x, position.y),
                    vel: new Vec(
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                    ),
                    life: 1,
                    radius: Math.random() * 3 + 1,
                    color: 'cyan',
                });
            }
        };

        const updateDirection = (newPos: Vec) => {
            if (lastInputPos.current.distance(newPos) > MOVEMENT_THRESHOLD) {
                const head = snakeParts[0];
                if (head) {
                    const newDir = new Vec(
                        newPos.x - head.pos.x,
                        newPos.y - head.pos.y,
                    );
                    if (newDir.magnitude() > 0) {
                        direction.current = newDir.normalized();
                    }
                }
                lastInputPos.current = newPos;
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            mousePos = new Vec(event.clientX, event.clientY);
            updateDirection(mousePos);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (event.target !== canvas) return;
            event.preventDefault();
            if (event.touches.length > 0) {
                const touch = event.touches;
                mousePos = new Vec(touch[0].clientX, touch[0].clientY);
                updateDirection(mousePos);
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            tick++;

            // Use a semi-transparent background for a motion trail effect
            ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- Food ---
            foods.forEach(food => {
                const pulse = Math.sin(tick * 0.1) * 2; // Pulsing effect
                ctx.fillStyle = 'cyan';
                ctx.shadowColor = 'cyan';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(
                    food.pos.x,
                    food.pos.y,
                    food.radius + pulse,
                    0,
                    2 * Math.PI,
                );
                ctx.fill();
            });
            ctx.shadowBlur = 0; // Reset shadow for other elements

            // --- Snake Movement ---
            const speed = 4;
            const segmentLength = SNAKE_PART_RADIUS * 0.8; // Segments are closer together
            const head = snakeParts[0];
            const target = mousePos;

            // Move head towards direction
            head.pos = head.pos.add(direction.current.multiply(speed));

            // Prevent outofscreen
            if (head.pos.x > canvas.width) direction.current.x = -1;
            if (head.pos.x < 0) head.pos.x = direction.current.x = 1;
            if (head.pos.y > canvas.height) direction.current.y = -1;
            if (head.pos.y < 0) head.pos.y = direction.current.y = 1;

            // const dirToTarget = new Vec(
            //     target.x - head.pos.x,
            //     target.y - head.pos.y,
            // );
            // if (dirToTarget.magnitude() > 1) {
            //     head.pos = head.pos.add(
            //         dirToTarget.normalized().multiply(speed),
            //     );
            // }

            for (let i = 1; i < snakeParts.length; i++) {
                const currentPart = snakeParts[i];
                const prevPart = snakeParts[i - 1];
                const dirToPrev = new Vec(
                    prevPart.pos.x - currentPart.pos.x,
                    prevPart.pos.y - currentPart.pos.y,
                );
                const dist = dirToPrev.magnitude();

                if (dist > segmentLength) {
                    const correction = dirToPrev
                        .normalized()
                        .multiply(dist - segmentLength);
                    currentPart.pos = currentPart.pos.add(correction);
                }
            }

            // --- Snake Rendering ---
            // Draw from tail to head
            for (let i = snakeParts.length - 1; i > 0; i--) {
                const part = snakeParts[i];
                const scale = (snakeParts.length - i) / snakeParts.length; // Inverted scale
                const radius = SNAKE_PART_RADIUS; // Tapering tail
                const hue = 350 + scale * 40; // Gradient from red to magenta

                ctx.fillStyle = `hsl(${hue}, 90%, 65%)`;
                ctx.beginPath();
                ctx.arc(
                    part.pos.x,
                    part.pos.y,
                    Math.max(1, radius),
                    0,
                    2 * Math.PI,
                );
                ctx.fill();
            }

            // Draw the head separately for a distinct look
            ctx.fillStyle = 'hsl(0, 100%, 70%)';
            ctx.shadowColor = 'red';
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.arc(
                head.pos.x,
                head.pos.y,
                SNAKE_PART_RADIUS + 2,
                0,
                2 * Math.PI,
            );
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw eyes on the head
            const angle = Math.atan2(direction.current.y, direction.current.x);
            const eyeOffset = SNAKE_PART_RADIUS / 2;
            ctx.fillStyle = 'white';
            const eye1X = head.pos.x + Math.cos(angle - 0.5) * eyeOffset;
            const eye1Y = head.pos.y + Math.sin(angle - 0.5) * eyeOffset;
            const eye2X = head.pos.x + Math.cos(angle + 0.5) * eyeOffset;
            const eye2Y = head.pos.y + Math.sin(angle + 0.5) * eyeOffset;
            ctx.beginPath();
            ctx.arc(eye1X, eye1Y, 3, 0, 2 * Math.PI);
            ctx.arc(eye2X, eye2Y, 3, 0, 2 * Math.PI);
            ctx.fill();

            // --- Particles ---
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow
            particles.forEach((p, index) => {
                p.pos = p.pos.add(p.vel);
                p.life -= 0.025;

                if (p.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    ctx.fillStyle = `rgba(0, 255, 255, ${p.life})`;
                    ctx.beginPath();
                    ctx.arc(p.pos.x, p.pos.y, p.radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });
            ctx.globalCompositeOperation = 'source-over'; // Reset blending mode

            // --- Collision and Growth ---
            foods.forEach((food, index) => {
                const dist = head.pos.distance(food.pos);
                if (dist < SNAKE_PART_RADIUS + food.radius) {
                    createEatParticles(food.pos); // Create particle burst
                    foods.splice(index, 1);
                    spawnFood(1);

                    // Add new parts to the snake's tail for smooth growth
                    const lastPart = snakeParts[snakeParts.length - 1];
                    for (let i = 0; i < 5; i++) {
                        snakeParts.push({
                            pos: new Vec(lastPart.pos.x, lastPart.pos.y),
                        });
                    }
                }
            });

            // --- UI ---
            ctx.strokeStyle = 'white';
            ctx.strokeText(snakeParts.length.toString(), 32, canvas.height / 2);

            animationFrameId = requestAnimationFrame(draw);
        };

        // --- Setup and Teardown ---
        resizeCanvas();
        initSnake();
        spawnFood(25);
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, {passive: false});
        window.addEventListener('touchstart', handleTouchMove, {
            passive: false,
        });
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{display: 'block', background: '#111111'}}
        />
    );
};

export default function SnakeGamePage() {
    return <Canvas />;
}

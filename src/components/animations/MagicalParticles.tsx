import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    fadeDirection: number;
    color: string;
}

export function MagicalParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const particles: Particle[] = [];
        const particleCount = 30;

        const colors = [
            'rgba(200, 169, 110, ',
            'rgba(232, 200, 122, ',
            'rgba(212, 165, 116, ',
            'rgba(245, 230, 200, ',
        ];

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }

        function createParticle(): Particle {
            return {
                x: Math.random() * canvas!.width,
                y: Math.random() * canvas!.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: -Math.random() * 0.5 - 0.1,
                opacity: Math.random() * 0.5 + 0.1,
                fadeDirection: Math.random() > 0.5 ? 1 : -1,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        function animate() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            particles.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity += p.fadeDirection * 0.003;

                if (p.opacity >= 0.6) p.fadeDirection = -1;
                if (p.opacity <= 0.05) p.fadeDirection = 1;

                // Reset if off screen
                if (p.y < -10 || p.x < -10 || p.x > canvas!.width + 10) {
                    particles[index] = createParticle();
                    particles[index].y = canvas!.height + 10;
                }

                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx!.fillStyle = `${p.color}${p.opacity})`;
                ctx!.fill();

                // Glow effect
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx!.fillStyle = `${p.color}${p.opacity * 0.3})`;
                ctx!.fill();
            });

            animationId = requestAnimationFrame(animate);
        }

        resize();
        animate();
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 50,
                opacity: 0.6,
            }}
        />
    );
}

import { useEffect, useRef } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = [];
        let mouse = { x: -100, y: -100 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Spawn multiple particles per move for a dense trail
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: mouse.x + (Math.random() - 0.5) * 10,
                    y: mouse.y + (Math.random() - 0.5) * 10,
                    size: Math.random() * 4 + 1,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2 - 1,
                    life: 1, // 1 = full, 0 = dead
                    decay: Math.random() * 0.02 + 0.015,
                    hue: 130 + Math.random() * 20, // green range
                    type: Math.random() > 0.6 ? 'spark' : 'dot'
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = p.life;

                if (p.type === 'spark') {
                    // Star/spark shape
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life})`;
                    ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${p.life * 0.8})`;
                    ctx.shadowBlur = 15;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.life * Math.PI * 4);
                    const s = p.size * p.life;
                    ctx.beginPath();
                    for (let j = 0; j < 4; j++) {
                        ctx.lineTo(0, -s * 2);
                        ctx.lineTo(s * 0.5, -s * 0.5);
                        ctx.rotate(Math.PI / 2);
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // Glowing dot
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.life})`;
                    ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${p.life})`;
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[100] pointer-events-none"
        />
    );
};

export default CursorTrail;

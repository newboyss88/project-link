import { useState, useRef } from 'react';
import { FaShareNodes, FaCheck } from 'react-icons/fa6';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ShareButton = () => {
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef(null);
    const iconRef = useRef(null);
    const toastRef = useRef(null);

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Link Hub',
                    url: url
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useGSAP(() => {
        // Entrance
        gsap.from(buttonRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            delay: 2,
            ease: "elastic.out(1, 0.5)"
        });

        // Magnetic Effect Logic
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3" });
        const xIconTo = gsap.quickTo(iconRef.current, "x", { duration: 0.4, ease: "power3" });
        const yIconTo = gsap.quickTo(iconRef.current, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Trigger radius
            if (distance < 100) {
                xTo(distanceX * 0.4);
                yTo(distanceY * 0.4);
                xIconTo(distanceX * 0.2);
                yIconTo(distanceY * 0.2);
            } else {
                xTo(0);
                yTo(0);
                xIconTo(0);
                yIconTo(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, { scope: buttonRef });

    // Toast Animation
    useGSAP(() => {
        if (copied) {
            gsap.fromTo(toastRef.current,
                { y: 50, opacity: 0, x: "-50%" },
                { y: 0, opacity: 1, x: "-50%", duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [copied]);

    return (
        <>
            <div className="fixed top-6 right-6 z-50">
                <button
                    ref={buttonRef}
                    onClick={handleShare}
                    className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md shadow-lg group overflow-hidden relative cursor-pointer outline-none"
                    aria-label="Share"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div ref={iconRef} className="relative z-10">
                        {copied ? (
                            <FaCheck className="text-green-400 text-xl" />
                        ) : (
                            <FaShareNodes className="text-white text-xl group-hover:rotate-12 transition-transform" />
                        )}
                    </div>
                </button>
            </div>

            {copied && (
                <div
                    ref={toastRef}
                    className="fixed bottom-10 left-1/2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex items-center gap-3 text-sm font-medium"
                    style={{ transform: "translateX(-50%)" }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                    Havola nusxalandi
                </div>
            )}
        </>
    );
};

export default ShareButton;

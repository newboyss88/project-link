import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Profile = ({ name, bio, imageSrc }) => {
    const containerRef = useRef(null);
    const nameRef = useRef(null);
    const bioRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Image Animation
        tl.from(imageRef.current, {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            clearProps: "all"
        });

        // Name Animation
        tl.from(nameRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            clearProps: "transform" // Keep opacity handled by CSS if needed, but here we want to ensure it stays visible
        }, "-=0.8");

        // Bio Animation
        tl.from(bioRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            clearProps: "all"
        }, "-=0.6");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center text-center py-6">
            <div
                ref={imageRef}
                className="relative group mb-6 cursor-pointer transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-200 animate-tilt"></div>
                <div className="relative w-40 h-40 rounded-full p-1 bg-black/80 backdrop-blur-2xl border border-white/20 overflow-hidden ring-2 ring-white/10 group-hover:ring-white/30 transition-all">
                    <img
                        src={imageSrc}
                        alt={name}
                        className="w-full h-full object-cover rounded-full filter brightness-90 contrast-125 group-hover:brightness-110 transition-all duration-300"
                    />
                </div>
            </div>

            <div className="overflow-hidden mb-3">
                <h1 ref={nameRef} className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tighter">
                    {name}
                </h1>
            </div>

            <div ref={bioRef} className="inline-flex items-center px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg shadow-inner shadow-white/5">
                <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-gray-300 font-medium tracking-wide text-sm">
                    {bio}
                </p>
            </div>
        </div>
    );
};

export default Profile;

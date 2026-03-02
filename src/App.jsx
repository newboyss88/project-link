import { useRef, useEffect, useState } from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaTelegram, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import profilePic from './assets/baralov.jpg';
import './index.css';

function App() {
  const containerRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "Aralov Botir";

  // Typing effect for the name
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Reveal all elements slowly with standard GSAP setup
    gsap.to('.reveal-target', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // Profile picture glitch/fade-in
    gsap.to('.profile-glow', {
      opacity: 1,
      duration: 2,
      delay: 1.5,
      ease: 'power2.inOut'
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] bg-black text-green-400 font-mono overflow-hidden">

      {/* Background Matrix-style subtle gradient (optional, keeps it primarily black) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black"></div>

      {/* TOP LEFT: Main Links Group */}
      <div className="reveal-target opacity-0 translate-y-4 absolute left-4 top-6 md:left-12 md:top-12 flex flex-wrap items-center gap-2 md:gap-3 z-20 max-w-[90vw]">
        <a
          href="https://svaj.uz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm md:text-base text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 whitespace-nowrap"
        >
          deving @ SVAJ Portfolio
        </a>
        <span className="text-green-500/40 font-mono">·</span>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm md:text-base text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 whitespace-nowrap"
        >
          dasturlash maqolalari
        </a>
        <span className="text-green-500/40 font-mono">·</span>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm md:text-base text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 whitespace-nowrap"
        >
          mening rezyumem
        </a>
        <span className="text-green-500/40 font-mono hidden md:inline">·</span>
      </div>

      {/* SOCIAL ICONS (Mobile: Right-Mid) (Desktop: Below links on the left) */}
      <div className="reveal-target opacity-0 translate-y-4 absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 md:left-12 md:right-auto md:top-28 md:translate-y-0 md:flex-row z-20">
        <a href="https://github.com/newboyss88" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="GitHub">
          <FaGithub className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
        <a href="https://instagram.com/baralov88" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Instagram">
          {/* Fallback to simple icon class if specific ones are tricky, but react-icons works fine */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5 md:w-[26px] md:h-[26px]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
        </a>
        <a href="https://linkedin.com/in/botir-aralov-a93187284" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="LinkedIn">
          <FaLinkedin className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
        <a href="mailto:botir@example.com" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Email">
          <FaEnvelope className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
        <a href="https://t.me/wwuzbww" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Telegram">
          <FaTelegram className="w-5 h-5 md:w-[26px] md:h-[26px]" />
        </a>
      </div>

      {/* TOP RIGHT: Fake Music Player / Decorative Element (like reference) */}
      <div className="reveal-target opacity-0 absolute right-6 top-6 md:right-12 md:top-12 font-mono text-xs md:text-sm flex hidden md:flex items-center gap-3 z-20">
        <button className="text-green-300/60 whitespace-nowrap transition-all duration-300 hover:text-green-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] cursor-default">
          STATUS: ONLINE
        </button>
      </div>

      {/* CENTER / PROFILE PICTURE INTEGRATION */}
      {/* We place the picture subtly in the layout to not break the raw text aesthetic */}
      <div className="profile-glow opacity-0 absolute left-4 md:left-12 bottom-32 md:bottom-32 z-10">
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-sm overflow-hidden border border-green-500/30 opacity-70 hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_30px_rgba(74,222,128,0.3)] hover:drop-shadow-[0_0_40px_rgba(74,222,128,0.6)] mix-blend-screen filter grayscale contrast-150 sepia-[.7] hue-rotate-[70deg] saturate-[300%]">
          <img src={profilePic} alt="Aralov Botir" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* BOTTOM ROW: Name and Dotted Line */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col md:flex-row md:items-end md:justify-between px-4 md:px-12 pb-8 md:pb-12 gap-4 md:gap-0 z-20">

        {/* Bottom Left: Name/Role */}
        <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-normal text-green-400 tracking-tight text-left cursor-default transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 md:w-auto">
          <div className="relative flex flex-col">
            <span className="flex items-center text-4xl md:text-6xl font-bold mb-2 text-white">
              {typedText}
              <span className="terminal-cursor text-green-500 ml-1"></span>
            </span>
            <span className="text-green-500/80 text-lg md:text-2xl mt-1">
              > fullstack dev_
            </span>
          </div>
        </div>

        {/* Bottom Right: Dotted Line */}
        <p className="font-mono text-base md:text-xl text-green-300/60 md:max-w-md text-left md:text-right cursor-default transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 lg:tracking-[0.2em] break-all md:break-normal">
          ...........................................................
        </p>
      </div>

    </div>
  );
}

export default App;

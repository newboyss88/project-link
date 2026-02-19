import { useRef } from 'react';
import { FaTelegram, FaInstagram, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Profile from './components/Profile';
import LinkCard from './components/LinkCard';
import ShareButton from './components/ShareButton';
import profilePic from './assets/baralov.jpg';
import './index.css';

function App() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  const links = [
    {
      title: 'Telegram Kanalim',
      subtitle: '@wwuzbww',
      url: 'https://t.me/wwuzbww',
      icon: <FaTelegram className="text-blue-400 text-3xl" />,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Instagram',
      subtitle: 'Rasmlar va Hayot',
      url: 'https://instagram.com/baralov88',
      icon: <FaInstagram className="text-pink-500 text-3xl" />,
      color: 'from-pink-500/20 to-purple-500/20'
    },
    {
      title: 'LinkedIn',
      subtitle: 'Professional Tarmoq',
      url: 'https://linkedin.com/in/botir-aralov-a93187284',
      icon: <FaLinkedin className="text-blue-600 text-3xl" />,
      color: 'from-blue-600/20 to-indigo-600/20'
    },
    {
      title: 'GitHub',
      subtitle: 'Kodlarim va Loyihalarim',
      url: 'https://github.com/newboyss88',
      icon: <FaGithub className="text-gray-300 text-3xl" />,
      color: 'from-gray-600/20 to-gray-800/20'
    },
    {
      title: 'Portfolio',
      subtitle: 'Tanlangan Ishlar',
      url: 'https://portfolio-link.com',
      icon: <FaGlobe className="text-emerald-400 text-3xl" />,
      color: 'from-emerald-500/20 to-green-600/20'
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Ensure elements are visible before animating (if JS fails, they might be hidden by default styled but CSS should handle it)
    // Actually, with GSAP .from(), if it doesn't run, opacity stays 1 (default CSS) unless we set opacity:0 in CSS.
    // We didn't set opacity:0 in CSS, so if GSAP fails, site is visible.
    // But if GSAP starts and then hangs, it might get stuck.

    // Grid Stagger Animation
    tl.from('.card-item', {
      y: 100,
      opacity: 0,
      rotateX: -15,
      stagger: 0.1,
      duration: 1.5,
      delay: 0.2, // Reduced delay
      clearProps: "all" // Ensure cleanup after animation
    });

    // Footer Animation
    tl.from('footer', {
      opacity: 0,
      y: 20,
      duration: 1,
      clearProps: "all"
    }, "-=1");

    // Spotlight
    const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center py-12 px-4 overflow-hidden bg-deep-bg text-white perspective-1000">
      {/* Background Effects */}
      <div className="bg-noise"></div>

      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-overlay"
      ></div>

      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/40 rounded-full blur-[130px] animate-blob mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-900/30 rounded-full blur-[130px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-cyan-900/20 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen"></div>
      </div>

      <ShareButton />

      <main className="w-full max-w-2xl z-20 flex flex-col gap-8">
        <Profile
          name="Botir Aralov"
          bio="Full Stack Dasturchi | UI/UX Dizayner"
          imageSrc={profilePic}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <div key={index} className={index === links.length - 1 && links.length % 2 !== 0 ? 'md:col-span-2' : ''}>
              <LinkCard
                {...link}
                fullWidth={index === links.length - 1 && links.length % 2 !== 0}
              />
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-white/30 text-sm font-light tracking-widest uppercase">
          <p>Mehr bilan yaratilgan</p>
        </footer>
      </main>
    </div>
  );
}

export default App;

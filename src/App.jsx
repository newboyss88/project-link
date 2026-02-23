import { useRef } from 'react';
import { FaGlobe, FaPenNib, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Components
import LinkButton from './components/LinkButton';
import SocialIcons from './components/SocialIcons';
import ShareButton from './components/ShareButton';

// Assets
import profilePic from './assets/baralov.jpg';
import './index.css';

function App() {
  const containerRef = useRef(null);
  const profileRef = useRef(null);

  const mainLinks = [
    {
      title: 'SVAJ Portfolio - 0 dan Pro darajaga',
      url: 'https://svaj.uz',
      icon: <FaGlobe />
    },
    {
      title: 'Mening rezyumem (Resume)',
      url: '#', // Replace with actual link
      icon: <FaBriefcase />
    },
    {
      title: 'Dasturlash bo\'yicha maqolalar',
      url: '#', // Replace with actual link
      icon: <FaPenNib />
    },
    {
      title: 'Men bilan bog\'lanish',
      url: 'mailto:botir@example.com', // Replace
      icon: <FaEnvelope />
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Profile Entry
    tl.from(profileRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.1
    });

    // Links Stagger
    tl.from('.link-item', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      clearProps: 'all' // Clean up for hover states
    }, "-=0.5");

    // Social Row Entry
    tl.from('.social-row', {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, "-=0.3");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen relative flex flex-col items-center py-16 px-4 pb-24 overflow-x-hidden">
      <ShareButton />

      {/* Main Content Container - Max width typical 680px for Linktree */}
      <main className="w-full max-w-[680px] mx-auto z-10 flex flex-col items-center">

        {/* Profile Section */}
        <div ref={profileRef} className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-sm border border-black/5 bg-white">
            <img
              src={profilePic}
              alt="Botir Aralov"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-[20px] font-bold tracking-tight text-gray-900">
              Ismoil Safarov
            </h1>
            <p className="text-[15px] font-normal text-gray-600 max-w-sm px-4">
              Raqamli olamda biznesingizni parvoz qildiruvchi premium yechimlar. Shunchaki kod emas, kelajakni yozaman.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full flex justify-center items-center flex-col px-2 sm:px-0">
          {mainLinks.map((link, index) => (
            <LinkButton
              key={index}
              title={link.title}
              url={link.url}
              icon={link.icon}
            />
          ))}
        </div>

        {/* Social Icons Header/Separation */}
        <SocialIcons />

      </main>

      {/* Footer Element */}
      <footer className="absolute bottom-8 text-center w-full z-10">
        <p className="text-sm font-semibold text-gray-400">
          <span className="opacity-75 tracking-wider">LINK HUB</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MatrixRain from './components/MatrixRain';
import CursorTrail from './components/CursorTrail';
import ScrambleText from './components/ScrambleText';
import RotatingTitle from './components/RotatingTitle';
import profilePic from './assets/baralov.jpg';
import './index.css';

// YouTube Playlists — each holds 100-200+ songs, totaling 1000+ tracks
const PLAYLISTS = [
  'PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU',  // Popular Music Worldwide
  'PLgzTt0k8mXzEk586SfGBUhIKMa1t2HBQN',  // Top Hits 2024-2025
  'PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',  // Pop Music Playlist
  'PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5',  // Chill Vibes
  'PLhsz9CILh357zA1yMKjMFMDv94qOidFgZ',  // Trending Global Hits
];

function App() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [trackName, setTrackName] = useState('click to listen');

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };
  }, []);

  const initPlayer = () => {
    const randomPlaylist = PLAYLISTS[Math.floor(Math.random() * PLAYLISTS.length)];
    playerRef.current = new window.YT.Player('yt-player', {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        listType: 'playlist',
        list: randomPlaylist,
      },
      events: {
        onReady: (event) => {
          setPlayerReady(true);
          event.target.setShuffle(true);
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            try {
              const videoData = e.target.getVideoData();
              if (videoData && videoData.title) {
                setTrackName(videoData.title);
              }
            } catch (err) {
              setTrackName('now playing...');
            }
            setIsPlaying(true);
          } else if (e.data === window.YT.PlayerState.ENDED) {
            e.target.nextVideo();
          } else if (e.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        }
      }
    });
  };

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      setTrackName('paused');
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }, [isPlaying, playerReady]);

  const nextTrack = useCallback(() => {
    if (!playerRef.current || !playerReady) return;
    playerRef.current.nextVideo();
    setIsPlaying(true);
  }, [playerReady]);

  const prevTrack = useCallback(() => {
    if (!playerRef.current || !playerReady) return;
    playerRef.current.previousVideo();
    setIsPlaying(true);
  }, [playerReady]);

  const shuffleTrack = useCallback(() => {
    if (!playerRef.current || !playerReady) return;
    const randomPlaylist = PLAYLISTS[Math.floor(Math.random() * PLAYLISTS.length)];
    playerRef.current.loadPlaylist({
      listType: 'playlist',
      list: randomPlaylist,
      index: Math.floor(Math.random() * 50),
    });
    setTimeout(() => {
      if (playerRef.current) playerRef.current.setShuffle(true);
    }, 1000);
    setIsPlaying(true);
  }, [playerReady]);

  useGSAP(() => {
    gsap.from('.fade-in', {
      opacity: 0,
      y: 10,
      stagger: 0.12,
      duration: 1,
      ease: 'power2.out',
      delay: 0.3
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden font-mono bg-black text-green-400 cursor-none">

      {/* ===== CURSOR SPARKLE TRAIL ===== */}
      <CursorTrail />

      {/* ===== BACKGROUND: Profile Picture (darkened, green-tinted) ===== */}
      <div className="fixed inset-0 -z-10" style={{ transition: 'transform 0.8s ease-out' }}>
        <img
          src={profilePic}
          alt="Aralov Botir"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.15)', transformOrigin: 'center center', transition: 'transform 0.8s ease-out', filter: 'grayscale(100%) contrast(1.5) brightness(0.35) sepia(0.8) hue-rotate(70deg) saturate(3)' }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* ===== MATRIX CODE RAIN OVERLAY ===== */}
      <MatrixRain />

      {/* ===== CENTER: Prominent Rotating Profile Picture ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
        <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute inset-2 rounded-full border border-green-400/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
          {/* Profile Image */}
          <div className="absolute inset-4 rounded-full overflow-hidden animate-spin" style={{ animationDuration: '60s' }}>
            <img
              src={profilePic}
              alt="Aralov Botir"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) contrast(1.8) brightness(0.5) sepia(1) hue-rotate(70deg) saturate(4)' }}
            />
          </div>
          {/* Inner green glow overlay */}
          <div className="absolute inset-4 rounded-full bg-green-500/10 mix-blend-screen"></div>
          {/* Scan line effect */}
          <div className="absolute inset-4 rounded-full overflow-hidden">
            <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }}></div>
          </div>
        </div>
      </div>

      {/* ===== TOP: Scrolling Marquee Bar ===== */}
      <div className="fade-in absolute inset-x-0 top-0 pt-6 md:pt-8 z-20">
        <div className="overflow-hidden">
          <div className="marquee-track" style={{ gap: '32px' }}>
            {[0, 1].map((_, repeat) => (
              <div key={repeat} className="flex items-center" style={{ gap: '12px', paddingRight: '32px' }}>
                <span className="font-mono text-xs md:text-base text-green-400 whitespace-nowrap">
                  Salom, men Aralov Botir, Tashkentdan fullstack dasturchi.
                </span>
                <span className="text-green-500/40 font-mono">·</span>
                <a href="https://svaj.uz" target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-base text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 whitespace-nowrap">
                  deving @ SVAJ Portfolio
                </a>
                <span className="text-green-500/40 font-mono">·</span>
                <a href="https://github.com/newboyss88" target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-base text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 whitespace-nowrap">
                  coding open-source projects
                </a>
                <span className="text-green-500/40 font-mono">·</span>
                <a href="https://t.me/wwuzbww" target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-base text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 whitespace-nowrap">
                  telegram blog ham bor
                </a>
                <span className="text-green-500/40 font-mono">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TOP-RIGHT: Music Player (with real YouTube) ===== */}
      <div className="fade-in absolute inset-x-0 md:inset-x-auto md:right-8 top-14 md:top-24 font-mono text-xs md:text-sm flex items-center justify-center md:justify-end gap-3 px-4 md:px-0 z-20">
        <button
          onClick={togglePlay}
          className="text-green-300/60 whitespace-nowrap transition-all duration-300 hover:text-green-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] cursor-pointer"
          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
        >
          {isPlaying ? `now playing: ${trackName}` : trackName}
          {' '}
          <span className="sound-bars" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
            <span></span><span></span><span></span><span></span>
          </span>
        </button>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Skip Back */}
          <button onClick={prevTrack} className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Previous track">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" x2="5" y1="19" y2="5"></line></svg>
          </button>
          {/* Play/Pause */}
          <button onClick={togglePlay} className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Play music">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[22px] md:h-[22px]">
              {isPlaying ? (
                <>
                  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                  <path d="M16 9a5 5 0 0 1 0 6"></path>
                  <path d="M19.364 6.636a9 9 0 0 1 0 10.728"></path>
                </>
              ) : (
                <>
                  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                  <line x1="22" x2="16" y1="9" y2="15"></line>
                  <line x1="16" x2="22" y1="9" y2="15"></line>
                </>
              )}
            </svg>
          </button>
          {/* Skip Forward */}
          <button onClick={nextTrack} className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Next track">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" x2="19" y1="5" y2="19"></line></svg>
          </button>
          {/* Shuffle */}
          <button onClick={shuffleTrack} className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125" aria-label="Random track">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"></path><path d="m18 2 4 4-4 4"></path><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"></path><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"></path><path d="m18 14 4 4-4 4"></path></svg>
          </button>
        </div>
      </div>

      {/* ===== HIDDEN YouTube Player ===== */}
      <div className="absolute w-0 h-0 overflow-hidden">
        <div id="yt-player"></div>
      </div>

      {/* ===== BOTTOM: Rotating Title + Scramble Text ===== */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col md:flex-row md:items-end md:justify-between px-4 md:px-16 pb-8 md:pb-12 gap-4 md:gap-0 z-20">
        {/* Bottom Left: Rotating Titles */}
        <div className="font-mono text-2xl md:text-3xl font-normal text-green-400 tracking-tight text-left cursor-default transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 md:w-[30%]">
          <RotatingTitle />
        </div>

        {/* Bottom Right: Scramble Text */}
        <div className="font-mono text-base md:text-xl text-green-300/80 md:max-w-md text-left md:text-right transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300">
          <ScrambleText text="kodlar orqali dunyoni o'zgartiraman. har bir satr — yangi imkoniyat." />
        </div>
      </div>

      {/* ===== SOCIAL ICONS ===== */}
      <div className="fade-in absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:left-8 md:right-auto md:top-24 md:translate-y-0 md:flex-row md:gap-5 z-20">
        <a href="https://github.com/newboyss88" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[26px] md:h-[26px]"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </a>
        <a href="https://instagram.com/baralov88" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[26px] md:h-[26px]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
        </a>
        <a href="https://linkedin.com/in/botir-aralov-a93187284" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[26px] md:h-[26px]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="mailto:aralovbotir88@gmail.com" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[26px] md:h-[26px]"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
        </a>
        <a href="https://t.me/wwuzbww" target="_blank" rel="noopener noreferrer" className="text-green-400 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] hover:text-green-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[26px] md:h-[26px]"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
        </a>
      </div>

    </div>
  );
}

export default App;

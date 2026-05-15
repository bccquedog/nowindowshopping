import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { Heart, Music, Play, Pause, Gift, X } from 'lucide-react';

const PLAYLIST = [
  { src: '/assets/music/3_piece_ooh_ahh_Naijapals.mp3', title: '3 Piece Ooh Ahh' },
  { src: encodeURI('/assets/music/Soon As I Get Home (Faith Evans).mp3'), title: 'Soon As I Get Home' },
  { src: encodeURI('/assets/music/Step in The Name Of Love _ Swahilisongs.com.mp3'), title: 'Step in The Name Of Love' },
  { src: '/assets/music/Twisted.mp3', title: 'Twisted' },
];

const FLOATING_LOVE_MESSAGES = [
  'I love you',
  'Forever yours',
  'Always',
  'My heart is yours',
  'Together always',
  'You & me',
];

// Floating love message component
const FloatingLoveMessage: React.FC<{ message: string; delay: number; left: number; duration: number }> = ({ message, delay, left, duration }) => (
  <motion.div
    className="absolute pointer-events-none text-rose-300/40 font-light italic whitespace-nowrap"
    style={{
      left: `${left}%`,
      bottom: '-40px',
      fontSize: 'clamp(0.75rem, 2vw, 1rem)',
    }}
    initial={{ opacity: 0, y: 0 }}
    animate={{
      opacity: [0, 0.5, 0.4, 0],
      y: [-40, -(typeof window !== 'undefined' ? window.innerHeight : 1080) - 80],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
    }}
  >
    {message}
  </motion.div>
);

// Floating heart component
const FloatingHeart: React.FC<{ delay: number; left: number; size: number; duration: number }> = ({ delay, left, size, duration }) => (
  <motion.div
    className="absolute text-rose-400/30 pointer-events-none"
    style={{
      left: `${left}%`,
      bottom: '-20px',
      fontSize: `${size}px`,
    }}
    initial={{ opacity: 0, y: 0, rotate: 0 }}
    animate={{
      opacity: [0, 0.6, 0.3, 0],
      y: [-20, -(typeof window !== 'undefined' ? window.innerHeight : 1080) - 100],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
    }}
  >
    ♥
  </motion.div>
);

const VDaySurprise: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; size: number; delay: number; duration: number }>>([]);
  const [loveMessages, setLoveMessages] = useState<Array<{ id: number; message: string; left: number; delay: number; duration: number }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState<number[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = React.useRef(0);

  const photos = [
    '/assets/bdayphototos/IMG_3627.JPEG',
    '/assets/bdayphototos/IMG_3632.JPEG',
    '/assets/bdayphototos/IMG_3946.JPEG',
    '/assets/bdayphototos/IMG_5699.JPEG',
    '/assets/bdayphototos/IMG_6220.JPG',
    '/assets/bdayphototos/IMG_6371.JPG',
    '/assets/bdayphototos/IMG_6680.JPEG',
    '/assets/bdayphototos/IMG_6923.JPG',
    '/assets/bdayphototos/IMG_7671.JPEG',
    '/assets/bdayphototos/IMG_7958.JPG',
    '/assets/bdayphototos/IMG_9093.JPG',
    '/assets/bdayphototos/IMG_9261.JPEG',
  ];

  const playTrack = React.useCallback((index: number) => {
    if (!audioRef.current || index < 0 || index >= PLAYLIST.length) return;
    const track = PLAYLIST[index];
    audioRef.current.src = track.src;
    audioRef.current.load();
    audioRef.current.play().catch(e => console.log("Audio play failed", e));
    currentTrackRef.current = index;
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playTrack(currentTrackIndex);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    const handleEnded = () => {
      const nextIndex = (currentTrackRef.current + 1) % PLAYLIST.length;
      const track = PLAYLIST[nextIndex];
      audio.src = track.src;
      audio.load();
      audio.play().catch(e => console.log("Audio play failed", e));
      currentTrackRef.current = nextIndex;
      setCurrentTrackIndex(nextIndex);
    };
    audio.addEventListener('ended', handleEnded);
    audioRef.current = audio;
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);
  const reasons = [
    'Your smile lights up every room',
    'Your kindness knows no bounds',
    'You make every day an adventure',
    'Your strength inspires me',
    'You believe in me when I doubt myself',
    'Your laugh is my favorite sound',
    'You make our house a home',
    'Your love makes me a better person',
    'You see the best in everyone',
    'Every moment with you is a gift',
  ];

  useEffect(() => {
    // Generate floating hearts
    const heartData = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 24,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
    }));
    setHearts(heartData);

    // Generate floating love messages
    const messageData = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      message: FLOATING_LOVE_MESSAGES[i],
      left: Math.random() * 85,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
    }));
    setLoveMessages(messageData);

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "For Mrs. Proctor 💕 | Valentine's Day 2026";
    return () => {
      document.title = "No Window Shopping";
    };
  }, []);

  const revealReason = (index: number) => {
    if (!revealedReasons.includes(index)) {
      setRevealedReasons(prev => [...prev, index]);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
      {/* Font import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Great+Vibes&display=swap" rel="stylesheet" />

      {/* Floating hearts and love messages background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map((h) => (
          <FloatingHeart key={h.id} left={h.left} size={h.size} delay={h.delay} duration={h.duration} />
        ))}
        {loveMessages.map((m) => (
          <FloatingLoveMessage key={m.id} message={m.message} left={m.left} delay={m.delay} duration={m.duration} />
        ))}
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#e11d48', '#f43f5e', '#fda4af', '#fbbf24', '#fcd34d', '#a78bfa', '#c084fc'][Math.floor(Math.random() * 7)],
                }}
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 100,
                  rotate: 720,
                  opacity: 0,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-40"
      >
        <Link
          to="/hub"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-900/30 backdrop-blur-md border border-rose-500/30 text-rose-100 hover:bg-rose-800/50 transition-all duration-300"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </motion.div>

      {/* Music Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onClick={toggleMusic}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-rose-900/80 backdrop-blur-md border border-rose-500/30 text-rose-100 hover:bg-rose-800/90 transition-all duration-300 shadow-lg shadow-rose-900/50"
        >
          <div className={`p-2 rounded-full bg-rose-500/20 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium pr-2">{isPlaying ? PLAYLIST[currentTrackIndex].title : 'Play Playlist'}</span>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-rose-950 via-rose-900/95 to-rose-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f43f5e\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-amber-200/90 text-lg md:text-xl tracking-[0.3em] uppercase mb-4"
          >
            Valentine's Day 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            For Mrs. Proctor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-rose-200/80 text-xl md:text-2xl max-w-2xl mx-auto"
          >
            I love you to the moon and back
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="mt-8"
          >
            <Heart className="w-12 h-12 text-rose-400 mx-auto animate-pulse" />
          </motion.div>
        </motion.div>
      </section>

      {/* Love Letter Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-rose-950 via-rose-900/90 to-rose-950">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 text-rose-500/20">
              <Heart className="w-full h-full" />
            </div>
            <div className="bg-rose-950/80 backdrop-blur-sm border border-rose-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-rose-950/50">
              <p className="text-amber-200/70 text-sm tracking-widest uppercase mb-6">A Letter for You</p>
              <div className="space-y-6 text-rose-100/95 text-lg md:text-xl leading-relaxed">
                <p>
                  Mrs. Proctor,
                </p>
                <p>
                  On this Valentine's Day—February 14th, 2026—I wanted to create something special for you. Not just flowers or chocolates (though you deserve those too)—you've always said you value experiences over gifts, the moments we share and the memories we make. So here's something that captures even a fraction of what you mean to me.
                </p>
                <p>
                  You are the light in my life. Your presence transforms ordinary moments into extraordinary memories. Your kindness, your strength, your unwavering support—they've shaped who I am and who I strive to be.
                </p>
                <p>
                  Every day with you is a gift I never take for granted. You make our life beautiful in ways both big and small. Thank you for choosing me, for loving me, for building this life with me.
                </p>
                <p>
                  Here's to many more Valentine's Days together. Here's to us.
                </p>
                <p className="pt-4 text-amber-200/90" style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.75rem' }}>
                  All my love, always
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-rose-950 via-rose-900/95 to-rose-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center text-white mb-16"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Beautiful Memories
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden border border-rose-500/20 group relative"
              >
                <img 
                  src={photo} 
                  alt="Us" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-rose-950/20 group-hover:bg-transparent transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Gift */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-rose-950 via-rose-900/90 to-rose-950 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>
            A Little Surprise
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGift(true)}
            className="group relative inline-flex flex-col items-center justify-center"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl shadow-2xl shadow-rose-500/30 flex items-center justify-center mb-4 group-hover:shadow-rose-500/50 transition-all duration-300">
              <Gift className="w-16 h-16 text-white" />
            </div>
            <span className="text-rose-200 uppercase tracking-widest text-sm">Tap to Open</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Gift Modal */}
      <AnimatePresence>
        {showGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setShowGift(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-rose-950 border border-rose-500/30 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowGift(false)}
                className="absolute top-4 right-4 text-rose-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <Gift className="w-16 h-16 text-rose-400 mx-auto mb-6" />
              <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                My Gift to You
              </h3>
              <p className="text-rose-100/90 text-lg leading-relaxed mb-8">
                A weekend getaway for just the two of us. No phones, no work, just us.
                <br/><br/>
                <span className="text-sm text-rose-300/70">(Details to follow!)</span>
              </p>
              <div className="flex justify-center gap-2">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reasons I Love You - Interactive */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-rose-950 via-rose-900/95 to-rose-950">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-center text-white mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Ten Reasons I Love You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-rose-200/70 text-center mb-16"
          >
            Click each heart to reveal
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-rose-950/50 border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer group"
                onClick={() => revealReason(index)}
              >
                <motion.div
                  animate={{ scale: revealedReasons.includes(index) ? 1.2 : 1 }}
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center group-hover:bg-rose-500/30 transition-colors"
                >
                  <Heart className={`w-6 h-6 transition-all ${revealedReasons.includes(index) ? 'text-rose-400 fill-rose-400' : 'text-rose-500/50'}`} />
                </motion.div>
                <AnimatePresence mode="wait">
                  {revealedReasons.includes(index) ? (
                    <motion.p
                      key="revealed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-100 text-lg"
                    >
                      {reason}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hidden"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-rose-400/50 text-lg italic"
                    >
                      Click to reveal...
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-rose-950 to-rose-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-rose-600/10 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative text-center max-w-2xl mx-auto"
        >
          <p className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Forever Yours
          </p>
          <p className="text-rose-200/80 text-xl mb-8">
            Happy Valentine's Day, Mrs. Proctor. Today and every day.
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-16 h-16 text-rose-400 mx-auto fill-rose-400" />
          </motion.div>
          <p className="text-amber-200/60 text-sm mt-8">
            February 14, 2026
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default VDaySurprise;

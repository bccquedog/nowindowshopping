import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CommentsSection from './CommentsSection';

const CTASection = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    audioRef.current?.play();
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let hasPlayed = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            audioRef.current?.play();
            hasPlayed = true;
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-pink-200 py-12 sm:py-16 md:py-24 relative px-4">
      {/* Asset: outro-jingle.mp3 — Sitcom-style farewell jingle (see static asset list) */}
      <audio ref={audioRef} src="/assets/outro-jingle.mp3" className="hidden" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-6 sm:mb-8"
      >
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-3 sm:mb-4 px-2">
          "Thanks for scrolling back with us. Want more like this? Join the newsletter — no spam, just flashbacks."
        </blockquote>
        <form className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
          <input
            type="email"
            placeholder="Your email"
            className="px-3 sm:px-4 py-2 sm:py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base w-full md:w-auto"
          />
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 sm:py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition text-sm sm:text-base touch-manipulation w-full md:w-auto"
            onClick={handlePlay}
          >
            Join Newsletter
          </button>
        </form>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-blue-700 text-white rounded-full shadow-lg text-base sm:text-lg font-bold hover:bg-blue-800 transition touch-manipulation"
      >
        Share your story
      </motion.button>
      <div className="w-full mt-12 sm:mt-16">
        <CommentsSection />
      </div>
    </section>
  );
};

export default CTASection; 
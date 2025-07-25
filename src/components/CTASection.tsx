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
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-pink-200 py-24 relative">
      {/* Asset: outro-jingle.mp3 — Sitcom-style farewell jingle (see static asset list) */}
      <audio ref={audioRef} src="/assets/outro-jingle.mp3" className="hidden" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <blockquote className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
          “Thanks for scrolling back with us. Want more like this? Join the newsletter — no spam, just flashbacks.”
        </blockquote>
        <form className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
            onClick={handlePlay}
          >
            Join Newsletter
          </button>
        </form>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-full shadow-lg text-lg font-bold hover:bg-blue-800 transition"
      >
        Share your story
      </motion.button>
      <div className="w-full mt-16">
        <CommentsSection />
      </div>
    </section>
  );
};

export default CTASection; 
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const OverstimulatedSection2 = () => {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMute = () => {
    setMuted(true);
    audioRef.current?.play();
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row">
      {/* Asset: 90s-ambient.mp3 — Soft background track (see static asset list) */}
      <audio ref={audioRef} src="/assets/90s-ambient.mp3" loop className="hidden" />
      {!muted && (
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="flex-1 bg-gray-900 text-white flex flex-col justify-center items-center p-8 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-2xl font-bold text-pink-400"
          >
            Our phones buzz more than we speak
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-lg"
          >
            Notifications. Headlines. Dings. Pings.
          </motion.div>
          <button
            onClick={handleMute}
            className="mt-8 px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
          >
            Mute & Escape →
          </button>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={`flex-1 bg-gradient-to-br from-yellow-100 to-blue-200 flex flex-col justify-center items-center p-8 ${muted ? 'w-full' : ''}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-2xl font-bold text-blue-700"
        >
          90s analog world
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-lg"
        >
          Walkman. Cereal box. Quiet. We’re never really off.
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OverstimulatedSection2; 
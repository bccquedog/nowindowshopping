import { motion } from 'framer-motion';

const IntroSection = () => (
  <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
    {/* Asset: vhs.gif — Looping VHS static animation (see static asset list) */}
    <img
      src="/assets/vhs-static.gif"
      alt="VHS static background"
      className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none z-0"
    />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
        ESCAPING TO THE 90s
      </h1>
      <p className="text-lg md:text-2xl text-white/80 mb-8">
        An Interactive Essay
      </p>
    </motion.div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-white text-3xl"
      >
        ↓
      </motion.div>
      <span className="text-white text-xs mt-1">Scroll to begin</span>
    </div>
  </section>
);

export default IntroSection; 
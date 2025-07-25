import { motion } from 'framer-motion';

const items = [
  {
    src: "/assets/cassette.png",
    alt: "Cassette Tape",
    quote: "Rewinding was a ritual."
  },
  {
    src: "/assets/lisafrank.png",
    alt: "Lisa Frank Folder",
    quote: "Colors that made homework fun."
  },
  {
    src: "/assets/housephone.png",
    alt: "House Phone",
    quote: "You knew who was calling by the ring."
  }
];

const WonderSection3 = () => (
  <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-pink-100 overflow-hidden py-24">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative mb-12"
    >
      <div className="w-64 h-48 bg-black rounded-2xl shadow-2xl flex items-center justify-center border-8 border-blue-400 animate-pulse">
        <span className="text-white text-2xl font-mono glow">CRT TV</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-pink-500 text-3xl md:text-5xl font-bold mix-blend-screen animate-bounce opacity-90">
          PRESS START TO REMEMBER
        </span>
      </div>
    </motion.div>
    <div className="flex gap-12 mt-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.8 }}
          className="relative group flex flex-col items-center"
        >
          {/* Asset: cassette.png — 90s-style mixtape cassette (see static asset list) */}
          {/* Asset: lisafrank.png — Lisa Frank notebook/folder (see static asset list) */}
          {/* Asset: housephone.png — Corded house phone (see static asset list) */}
          <img
            src={item.src}
            alt={item.alt}
            className="w-24 h-24 drop-shadow-lg group-hover:scale-110 transition-transform duration-300 filter blur-sm group-hover:blur-0"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/90 text-blue-700 rounded px-3 py-1 text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {item.quote}
          </motion.div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WonderSection3; 
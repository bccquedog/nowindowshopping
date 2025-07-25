import { motion } from 'framer-motion';

const cards = [
  {
    text: "He’ll always be Theo Huxtable.",
    icon: "/assets/vhs-static.gif",
    alt: "VHS Icon"
  },
  {
    text: "We got a thrill out of going to Blockbuster.",
    icon: "/assets/cartridge.png",
    alt: "Game Cartridge Icon"
  },
  {
    text: "You had to blow in the cartridge sometimes.",
    icon: "/assets/cartridge.png",
    alt: "Game Cartridge Icon"
  }
];

const MemorySection1 = () => (
  <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-yellow-200 overflow-hidden">
    {/* Asset: blockbuster-shelf.jpg — Background shelf of VHS tapes (see static asset list) */}
    <img src="/static/blockbuster-shelf.jpg" alt="Blockbuster Shelf" className="absolute inset-0 w-full h-full object-cover z-0" />
    <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-center items-center py-24">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.8 }}
          className="bg-white/80 rounded-xl shadow-xl p-8 w-72 h-56 flex flex-col items-center justify-center group relative cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="text-lg text-center font-semibold mb-4">{card.text}</span>
          {/* Asset: cartridge.png — NES-style game cartridge (see static asset list) */}
          <motion.img
            src={card.icon}
            alt={card.alt}
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="w-16 h-16 absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      ))}
    </div>
  </section>
);

export default MemorySection1; 
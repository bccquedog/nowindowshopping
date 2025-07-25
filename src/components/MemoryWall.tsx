import { useState } from 'react';
import { motion } from 'framer-motion';

const MemoryWall = () => {
  const [memories, setMemories] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMemories([input, ...memories]);
      setInput('');
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-blue-100 py-24">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Memory Wall</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8 w-full max-w-md">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Share your favorite 90s memory..."
          className="w-full h-24 p-3 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-3xl">
        {memories.map((memory, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/90 rounded-xl px-4 py-3 shadow-lg text-blue-800 text-base max-w-xs"
          >
            {memory}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemoryWall; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CommentsSection from './components/CommentsSection';

const firsts = [
  { icon: '🎮', label: 'The first time you held a Game Boy' },
  { icon: '🏆', label: 'The first time you beat a level without cheating' },
  { icon: '☎️', label: 'The first time you called a crush from the house phone' },
];

const wonderActivities = [
  { icon: '🎨', label: 'Doing something creative just because' },
  { icon: '📻', label: 'Turning your phone off for 2 hours and playing your favorite 90s album' },
  { icon: '😜', label: 'Letting yourself be silly, unproductive, unfiltered' },
];

const floatingItems = [
  { icon: '📼', style: { top: '10%', left: '5%' } },
  { icon: '🎧', style: { top: '20%', right: '10%' } },
  { icon: '🕹️', style: { bottom: '15%', left: '15%' } },
  { icon: '📺', style: { bottom: '10%', right: '5%' } },
];

const BlogPostEscaping90s3: React.FC = () => {
  const [wonderLevel, setWonderLevel] = useState(0);
  const [selectedFirst, setSelectedFirst] = useState<string | null>(null);

  const handleWonder = () => {
    setWonderLevel((prev) => Math.min(prev + 33, 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-12 px-4 relative overflow-hidden">
      {/* Floating 90s items */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl opacity-10 pointer-events-none"
          style={item.style}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity }}
        >
          {item.icon}
        </motion.div>
      ))}

      <motion.div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert relative z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-4xl font-bold mb-2 text-center">Everything Was New Then</h1>
        <p className="text-gray-500 mb-8 text-center italic">Why the 90s felt magical — and how to reclaim that wonder</p>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎮 Before the Firsts Got Replaced by “More”</h2>
        <p>There was a time when everything was new:</p>
        {/* Interactive firsts memory cards */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {firsts.map((item) => (
            <motion.button
              key={item.label}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 text-center shadow-lg ${selectedFirst === item.label ? 'border-pink-500 bg-pink-50 dark:bg-pink-900' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
              onClick={() => setSelectedFirst(selectedFirst === item.label ? null : item.label)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-4xl mb-2">{item.icon}</span>
              <span className="font-semibold mb-1">{item.label}</span>
              {selectedFirst === item.label && <span className="text-pink-500 mt-2">✨ That feeling of pure discovery!</span>}
            </motion.button>
          ))}
        </div>
        <p>Even everyday things felt like adventures. Back then, wonder was built-in. Now? It’s algorithmically filtered.</p>
        <p>We don’t just miss the toys or tunes — we miss who we were when those things were enough.</p>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📦 Novelty vs. Numbness</h2>
        <p>We were wide-eyed then. Every moment was a possibility.</p>
        <p>Today, the modern adult mind is dulled by repetition and overstimulation. We’ve traded novelty for quantity, and it’s left us burnt out.</p>
        <p>The truth is: our lives aren’t lacking stuff — they’re lacking spark.</p>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🧠 Neurochemistry of Firsts</h2>
        <p>Psychologically, the 90s hit harder because they were full of "firsts" — and the brain stores those memories deeper. We weren’t just watching shows, we were forming identity.</p>
        <p>And once you’ve done something a hundred times, it stops lighting up your brain the same way. That’s why returning to childhood joys reawakens emotional circuits we forgot we had.</p>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🧸 Reclaiming the Magic</h2>
        <p>You don’t have to time-travel to feel wonder again. You can reclaim it by:</p>
        {/* Wonder activities and Wonder Meter */}
        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {wonderActivities.map((item) => (
            <motion.button
              key={item.label}
              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 text-center shadow-lg hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900 transition-all duration-300"
              onClick={handleWonder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              disabled={wonderLevel >= 100}
            >
              <span className="text-4xl mb-2">{item.icon}</span>
              <span className="font-semibold mb-1">{item.label}</span>
              <span className="text-blue-500 mt-2">+ Wonder</span>
            </motion.button>
          ))}
        </div>
        {/* Wonder Meter */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-center mb-2">Wonder Meter</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-2">
            <motion.div
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
              initial={{ width: '0%' }}
              animate={{ width: `${wonderLevel}%` }}
              transition={{ duration: 0.5 }}
            >
              {wonderLevel}%
            </motion.div>
          </div>
          <p className="text-center text-sm text-purple-600 dark:text-purple-400">
            {wonderLevel === 0 && 'Ready to rediscover wonder?'}
            {wonderLevel === 33 && 'Getting there! Keep going!'}
            {wonderLevel === 66 && 'Wonder is building up!'}
            {wonderLevel === 99 && 'Almost at peak wonder!'}
            {wonderLevel >= 100 && '🌟 MAXIMUM WONDER ACHIEVED! 🌟'}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">💬 Final Reflection</h2>
        <p>The 90s weren’t perfect. But they made space for awe. Not because life was easier — but because it was slower, smaller, and more textured.</p>
        <p>Maybe we’re not trying to go back. Maybe we’re just trying to bring that feeling forward.</p>

        {/* Series wrap-up */}
        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 dark:from-yellow-900 dark:to-pink-900 rounded-xl p-6 mt-8 border-2 border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-bold mb-4 text-center">✨ Series Wrap-Up Call to Action:</h3>
          <p className="text-center mb-4">
            Share your most magical 90s memory in the comments. One that still makes you smile — or tear up.<br />
            Let’s build a little time machine, one story at a time.
          </p>
        </div>
        <div className="mt-12">
          <CommentsSection />
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostEscaping90s3; 
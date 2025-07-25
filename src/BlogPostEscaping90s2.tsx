import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CommentsSection from './components/CommentsSection';

const notifications = [
  '📧 23 unread emails',
  '📱 15 text messages',
  '🔔 8 app notifications',
  '📰 12 news alerts',
  '💬 5 social media mentions',
];

const texture90s = [
  { icon: '✍️', label: 'A handwritten note' },
  { icon: '📼', label: 'Rewinding a cassette' },
  { icon: '🎮', label: 'Blowing into a cartridge' },
];
const textureNow = [
  { icon: '📱', label: 'Endless swipe' },
  { icon: '🖱️', label: 'Scroll, scroll, scroll' },
  { icon: '💻', label: 'Click, click, click' },
];

const BlogPostEscaping90s2: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 dark:from-pink-900 dark:via-yellow-900 dark:to-blue-900 py-12 px-4 relative overflow-hidden">
      {/* Animated phone notification simulator */}
      <motion.div
        className="absolute top-10 right-10 text-5xl opacity-10 pointer-events-none"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        📱
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-6xl opacity-10 pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        📼
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 text-4xl opacity-10 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎮
      </motion.div>

      <motion.div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert relative z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="text-4xl font-bold mb-2 text-center">Overstimulated Minds, Understimulated Souls</h1>
        <p className="text-gray-500 mb-8 text-center italic">Why adulthood is exhausting — and why 90s culture soothes us</p>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">😵‍💫 Why Everything Feels Like Too Much</h2>
        <p>We wake up tired. We scroll endlessly. We multitask even when we don’t have to. And yet, somehow, we still feel behind.</p>
        <p>That’s not just adulthood — that’s overstimulation.</p>
        <p>Today’s adults, especially millennials and elder Gen Zs, are living in a state of constant cognitive strain:</p>
        <ul>
          <li>Our phones buzz more than we speak.</li>
          <li>Our minds process more headlines in one day than our parents saw in a month.</li>
          <li>Even rest has turned into a productivity hack ("rest to optimize performance") instead of… rest.</li>
        </ul>
        <p>We’re not just overwhelmed — we’re numb and emotionally depleted.</p>

        {/* Interactive phone notifications */}
        <div className="my-6 flex flex-col items-center">
          <motion.button
            className={`px-6 py-2 rounded-lg font-semibold mb-2 ${showNotifications ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
          </motion.button>
          {showNotifications && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mt-2">
              {notifications.map((n, i) => (
                <motion.div
                  key={n}
                  className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-900 rounded-lg shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-red-500">🔴</span>
                  <span className="text-sm text-red-700 dark:text-red-300">{n}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🧠 The Psychology of Overstimulation</h2>
        <p>Overstimulation happens when your brain is bombarded with more input than it can process. This causes:</p>
        <ul>
          <li>Decision fatigue</li>
          <li>Emotional dysregulation</li>
          <li>Lack of presence</li>
          <li>Decreased creativity</li>
          <li>Chronic anxiety masked as “just being busy”</li>
        </ul>
        <p>The 90s, by contrast, were a time of delightful under-stimulation. You had time to:</p>
        <ul>
          <li>Stare out the window</li>
          <li>Read the back of the cereal box</li>
          <li>Rewind a VHS just to watch it again</li>
        </ul>
        <p>Today, boredom has been eliminated — and with it, our capacity for peace.</p>

        {/* Texture of Life comparison */}
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">90s (Textured)</h3>
            <div className="space-y-2">
              {texture90s.map((item) => (
                <motion.button
                  key={item.label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full text-left transition-all duration-300 ${selectedTexture === item.label ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-400' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
                  onClick={() => setSelectedTexture(selectedTexture === item.label ? null : item.label)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                  {selectedTexture === item.label && <span className="ml-auto text-blue-500">✨</span>}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">Today (Flat)</h3>
            <div className="space-y-2">
              {textureNow.map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg w-full text-left bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📼 The 90s as Emotional Balm</h2>
        <p>Rewatching old cartoons. Listening to 90s R&B. Playing Mario Kart. These aren’t just hobbies — they’re resets.</p>
        <p>They remind us of a time when joy didn’t require a subscription. When everything was new and nothing was urgent.</p>
        <p>And in a world where we’re constantly “on,” retreating to the 90s feels like emotional oxygen.</p>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🧃 We Miss the Texture of Life</h2>
        <p>A handwritten note. The feel of rewinding a cassette. Blowing into a cartridge to make the game start. These moments had texture. Today’s world is flat — endless swipe, scroll, click. Clean, polished, sterile. The 90s were messy, slow, and human. And we’re craving that more than we realize.</p>

        {/* Mute button for peace */}
        <div className="my-8 flex flex-col items-center">
          <motion.button
            className={`px-6 py-2 rounded-lg font-semibold mb-2 ${isMuted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? '🔊 Unmute the World' : '🔇 Mute the Noise'}
          </motion.button>
          {isMuted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-green-700 dark:text-green-300 font-medium">
              🌟 Peace Mode Activated! Take a moment to breathe. The 90s are calling you back to simplicity.
            </motion.div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl p-6 mt-8 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold mb-4 text-center">📝 Call to Action</h3>
          <p className="text-center mb-4">
            In what part of your life do you feel the most overstimulated? And what’s one 90s ritual that helped you feel grounded?<br />
            Let’s share and decompress — together.
          </p>
        </div>
        <div className="mt-12">
          <CommentsSection />
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostEscaping90s2; 
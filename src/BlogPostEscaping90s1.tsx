import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CommentsSection from './components/CommentsSection';

const BlogPostEscaping90s1: React.FC = () => {
  const [showNostalgia, setShowNostalgia] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  const memories = [
    "Saturday morning cartoons",
    "After-school snacks", 
    "Neighborhood bike rides",
    "Recording songs off the radio",
    "Blowing into game cartridges"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-yellow-900 dark:via-pink-900 dark:to-blue-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          📼
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-4xl opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎮
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-5xl opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌈
        </motion.div>
      </div>

      <motion.div 
        className="max-w-2xl mx-auto prose prose-lg dark:prose-invert relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold mb-2 text-center"
          variants={itemVariants}
        >
          Why We're All Escaping to the 90s
        </motion.h1>
        <motion.p 
          className="text-gray-500 mb-8 text-center italic"
          variants={itemVariants}
        >
          Overstimulated, overwhelmed, and unconsciously reaching for a simpler time
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          🚪 The Escape Hatch: Welcome to the 90s Again
        </motion.h2>
        <motion.p variants={itemVariants}>
          Open TikTok, scroll through Instagram, or walk into a Target, and you'll see it: the 90s are back. Not just as fashion or aesthetics — but as a feeling.
        </motion.p>
        <motion.p variants={itemVariants}>
          For those born in the 1980s and 1990s, the resurgence of Lisa Frank folders, Nickelodeon slime, sitcom theme songs, and even Blockbuster pop-ups isn't just a trend. It's a psychological retreat — a portal to the last place life felt manageable.
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          🧠 Nostalgia as a Coping Mechanism
        </motion.h2>
        <motion.p variants={itemVariants}>
          Psychologically, this makes perfect sense. When life gets chaotic, our brains reach backward. Studies show that nostalgia increases in times of stress, uncertainty, and disconnection — all of which define modern adulthood.
        </motion.p>
        <motion.p variants={itemVariants}>
          Millennials and elder Gen Zs grew up in the 1990s, a decade that coincided with their emotional imprint years (roughly ages 5–15). This window, known in psychology as the reminiscence bump, is when memories form most deeply and vividly. It's the time when identity, joy, safety, and imagination were first felt in full color.
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          📺 A Time of Simpler Joys — and Shared Rituals
        </motion.h2>
        
        {/* Interactive memories section */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-lg border-2 border-pink-200 dark:border-pink-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-4 text-center">Click to Remember:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {memories.map((memory, index) => (
              <motion.button
                key={memory}
                className={`p-3 rounded-lg text-left transition-all duration-300 ${
                  selectedMemory === memory 
                    ? 'bg-pink-100 dark:bg-pink-900 border-2 border-pink-400' 
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-pink-50 dark:hover:bg-pink-800 border border-gray-200 dark:border-gray-600'
                }`}
                onClick={() => setSelectedMemory(selectedMemory === memory ? null : memory)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium">{memory}</span>
                {selectedMemory === memory && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-pink-600 dark:text-pink-400"
                  >
                    ✨ You remember this!
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.p variants={itemVariants}>
          Everything was an adventure — even turning on your Sega felt like a small victory. We got a thrill out of going to Blockbuster, walking through those aisles, trying to get your hands on the last copy of Space Jam. That kind of physical, giddy anticipation? Netflix just doesn't deliver it.
        </motion.p>
        <motion.p variants={itemVariants}>
          And when you turned on The Cosby Show, you saw family, awkward teenage moments, and love on display. With the recent passing of Malcolm-Jamal Warner, many of us paused. Sure, he gave us incredible performances as Dr. AJ Austin later in life — but he'll always be Theo Huxtable to us. That's who we grew up with.
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          🔋 The Burnout Loop & Why We Feel So Overstimulated
        </motion.h2>
        <motion.p variants={itemVariants}>
          Today's world is fast, fragmented, and emotionally relentless. You wake up to headlines about climate catastrophe. Scroll through endless notifications. Work across multiple apps. Try to be reachable at all times. Rest doesn't feel like rest — even fun feels like work.
        </motion.p>

        {/* Interactive burnout symptoms */}
        <motion.div 
          className="bg-red-50 dark:bg-red-900 rounded-xl p-6 mb-6 border-2 border-red-200 dark:border-red-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-4 text-red-700 dark:text-red-300">Modern Burnout Symptoms:</h3>
          <div className="space-y-2">
            {[
              "Infinite choices, but no clarity",
              "Constant input, but little meaning", 
              "Always on, but never grounded"
            ].map((symptom, index) => (
              <motion.div
                key={symptom}
                className="flex items-center gap-2 text-red-600 dark:text-red-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <span className="text-red-500">⚡</span>
                <span>{symptom}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p variants={itemVariants}>
          This overstimulation depletes our emotional batteries. And when your brain gets overwhelmed, it searches for regulation — for something familiar, soft, and safe. Something like… neon colors, goofy sound effects, and the Full House intro.
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          🧸 The 90s as a Security Blanket
        </motion.h2>
        <motion.p variants={itemVariants}>
          Nostalgia isn't just a vibe — it's a self-soothing mechanism. The 90s represent a moment in time when life felt slower, decisions felt smaller, and possibilities felt wide open.
        </motion.p>

        {/* Interactive security blanket */}
        <motion.div 
          className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 mb-6 border-2 border-blue-200 dark:border-blue-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-300">What the 90s Give Us:</h3>
          <div className="space-y-3">
            {[
              { text: "The theme songs remind us of predictability.", icon: "🎵" },
              { text: "The toys and colors bring back innocence.", icon: "🧸" },
              { text: "The slime and silliness give us permission to be unserious.", icon: "🌈" }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 text-blue-600 dark:text-blue-400"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p variants={itemVariants}>
          It's not regression. It's repair.
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          🛒 And Yes — It's Also Marketed to Us
        </motion.h2>
        <motion.p variants={itemVariants}>
          Brands know this. That's why you see reboots, retro logos, and revival merch everywhere. It's not a coincidence. Nostalgia sells — because it feels safe. It taps into pre-verbal emotional memory, making you feel something before you even think.
        </motion.p>
        <motion.p variants={itemVariants}>
          But while the 90s aesthetic may be packaged and monetized, the emotional root is still real.
        </motion.p>

        <motion.h2 
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          variants={itemVariants}
        >
          🌅 Closing Thought: What We're Really Trying to Remember
        </motion.h2>
        <motion.p variants={itemVariants}>
          When we long for the 90s, we're not just craving slap bracelets or Dunkaroos. We're trying to remember:
        </motion.p>

        {/* Interactive what we remember */}
        <motion.div 
          className="bg-green-50 dark:bg-green-900 rounded-xl p-6 mb-6 border-2 border-green-200 dark:border-green-800"
          variants={itemVariants}
        >
          <div className="space-y-2">
            {[
              "What it felt like to have hope without exhaustion",
              "To play without pressure",
              "To dream without distraction", 
              "To feel like everything was new"
            ].map((memory, index) => (
              <motion.div
                key={memory}
                className="flex items-center gap-2 text-green-600 dark:text-green-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <span className="text-green-500">✨</span>
                <span>{memory}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p variants={itemVariants}>
          Before we had to schedule joy. Before life came with disclaimers and data limits. Before adulthood took the air out of our cartridges.
        </motion.p>
        <motion.p variants={itemVariants}>
          We're not just chasing a decade — we're chasing a feeling.
        </motion.p>

        <motion.div 
          className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900 rounded-xl p-6 mt-8 border-2 border-pink-200 dark:border-pink-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-4 text-center">📝 Call to Action:</h3>
          <p className="text-center mb-4">
            What's one 90s moment that makes you feel safe, happy, or whole?<br />
            Drop it in the comments — and let's remember, together.
          </p>
          <motion.button
            className="mx-auto block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNostalgia(!showNostalgia)}
          >
            {showNostalgia ? "Hide Nostalgia Mode" : "Activate Nostalgia Mode"}
          </motion.button>
        </motion.div>

        {showNostalgia && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg border-2 border-yellow-300 dark:border-yellow-700"
          >
            <p className="text-center text-yellow-800 dark:text-yellow-200 font-medium">
              🌟 Nostalgia Mode Activated! 🌟<br />
              Take a deep breath and remember: you're not alone in this feeling.
            </p>
          </motion.div>
        )}

        <div className="mt-12">
          <CommentsSection />
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostEscaping90s1; 
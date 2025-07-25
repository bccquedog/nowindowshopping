import React from 'react';
import { Zap, Compass, Lightbulb, BookOpen, PauseCircle, ListChecks, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: <Compass className="w-6 h-6 text-blue-500" />, title: '1. Know your values.',
    desc: 'If you know what you stand on, you’ll always know what you’re walking into.'
  },
  {
    icon: <PauseCircle className="w-6 h-6 text-yellow-500" />, title: '2. Pause before yes.',
    desc: 'Even 10 seconds of silence can save 10 months of regret.'
  },
  {
    icon: <ListChecks className="w-6 h-6 text-green-500" />, title: '3. Keep receipts.',
    desc: 'Track your patterns. Learn from what worked (and what didn’t).'
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />, title: '4. Don’t confuse urgency with clarity.',
    desc: 'Not every moment that feels loud is important. Some are just noisy.'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-purple-500" />, title: '5. Trust your gut — but verify it with data.',
    desc: 'Let instinct speak. Let strategy decide.'
  },
];

export default function BlogPostImpulsivelyStrategic() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-yellow-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Be Impulsively Strategic
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-lg font-medium mb-2">
            <Zap className="w-6 h-6 mr-2 text-yellow-500" />
            Yes, you can follow your gut — just make sure it’s been fed by wisdom.
          </div>
        </div>

        {/* Opening Section */}
        <div className="mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2 text-lg">
            <p>People love to say,<br />“I’m just being spontaneous.”<br />Or — “I go with the flow.”<br />That’s cute until the flow takes you nowhere.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            Let’s be clear:<br />Impulses aren’t bad.<br />But unchecked impulses? That’s how you end up wasting money, burning bridges, and calling chaos ‘personality.’
          </div>
        </div>

        {/* Strategy Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold">
            <Lightbulb className="w-5 h-5" />
            Strategy Doesn’t Kill the Vibe. It Sharpens It.
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>You can book a random trip.<br />You can take the leap.<br />You can make the bold move.<br /><br />But even in your boldness — have a blueprint.<br /><br />Be the type of person who moves fast… but never moves blind.</p>
          </div>
        </div>

        {/* Want to Be “That Person”? */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-semibold">
            <CheckCircle className="w-5 h-5" />
            Want to Be “That Person”?
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>You know the one.<br />They make quick decisions, but somehow they never miss.<br />They seem lucky, but it’s not luck — it’s strategic intuition built over time.<br /><br />They’ve made enough mistakes, learned enough lessons, and planned enough futures… that even their risks are rooted.</p>
          </div>
        </div>

        {/* How Do You Build That? */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-pink-700 dark:text-pink-300 font-semibold">
            <ListChecks className="w-5 h-5" />
            So How Do You Build That?
          </div>
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-blue-100 dark:from-yellow-900 dark:to-blue-900">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                  <div className="text-gray-700 dark:text-gray-300">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Truth Is... */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-300 font-semibold">
            <Zap className="w-5 h-5" />
            The Truth Is…
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2 text-lg">
            <p>You can be passionate and powerful.<br />You can be hype and highly intelligent.<br />You can move in the moment and still move with intention.<br /><br />You’re not too creative for structure.<br />You’re too valuable to move sloppy.</p>
          </div>
        </div>

        {/* Final Thought */}
        <div className="mt-16 text-center">
          <div className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">At No Window Shopping, we don’t wait for life to happen —</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">we design it, we discipline it, and yes…<br />sometimes we flip the table just to build a better one.</div>
          <div className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">Be impulsive if you must.<br />But be impulsively strategic — because every moment you don’t plan for is a moment that might cost you more than you’re ready to pay.</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">— Brian</div>
        </div>
      </div>
    </div>
  );
} 
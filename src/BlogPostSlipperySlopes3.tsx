import React from 'react';
import { ArrowUpRight, Anchor, HeartHandshake, BookOpen, TrendingUp, CheckCircle, UserCheck, Sun, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

const steps = [
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />, title: '1. Don’t Rush the Climb',
    desc: 'You might want to fix everything in a week. But healing isn’t hustle. The slope took time. So will the climb. Start with one new habit, one clean boundary, one conversation with yourself. Change on purpose, not overnight.'
  },
  {
    icon: <Anchor className="w-6 h-6 text-indigo-500" />, title: '2. Re-Anchor in the Real You',
    desc: 'Sliding down a slope strips you. Before you add more goals and rules — remember who you are. What do you value? What’s non-negotiable now that you’ve seen what sliding costs? This is about coming home to yourself.'
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-pink-500" />, title: '3. Let Grace Be Your Spotter',
    desc: 'You can’t climb with shame sitting on your back. Shame keeps you stuck. Grace gets you up. You’re not who you were at the bottom. You’re the person who climbed anyway.'
  },
  {
    icon: <ArrowUpRight className="w-6 h-6 text-green-500" />, title: '4. Design New Slopes — That Go Up',
    desc: 'Not all slopes lead downward. Surround yourself with inspiration, challenge, and alignment. Life is gonna slope somewhere. Make sure it’s in the direction you actually want to go.'
  },
  {
    icon: <Map className="w-6 h-6 text-yellow-500" />, title: '5. Leave Breadcrumbs for the Next You',
    desc: 'Every time you climb, take notes. Document the fall, the turning point, the first step back up. You don’t just climb for today. You climb so tomorrow-you has a map.'
  },
];

export default function BlogPostSlipperySlopes3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-300 dark:from-yellow-900 dark:via-orange-900 dark:to-orange-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Slippery Slopes, Part 3: How to Climb Back Without Losing Yourself
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-lg font-medium mb-2">
            <ArrowUpRight className="w-6 h-6 mr-2 text-green-500" />
            This one’s for the rebuild. For the moment when awareness turns into action — and the real work begins.
          </div>
        </div>

        {/* Steps to Climb Back */}
        <div className="mb-10 space-y-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                <div className="text-gray-700 dark:text-gray-300">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Word */}
        <div className="mt-16 text-center">
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Slippery slopes are real. But they’re not the end.</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">They’re reminders. Signals. Invitations.<br />To come back to yourself. To choose better. To get your footing — and help someone else get theirs, too.</div>
          <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">So if you’re reading this at the bottom:<br />You're not broken. You're just ready.<br /><br />Stand up.<br />We’re climbing.</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-6">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
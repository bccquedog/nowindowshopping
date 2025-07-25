import React from 'react';
import { Users, MapPin, AlertTriangle, Eye, UserMinus, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

export default function BlogPostSlipperySlopes2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-300 dark:from-yellow-900 dark:via-orange-900 dark:to-orange-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Slippery Slopes, Part 2: Who’s Pushing You?
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-lg font-medium mb-2">
            <Users className="w-6 h-6 mr-2 text-indigo-500" />
            Slippery slopes don’t happen in a vacuum. They happen in community.
          </div>
        </div>

        {/* Not Everyone Deserves Proximity */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-pink-700 dark:text-pink-300 font-semibold">
            <UserMinus className="w-5 h-5" />
            Not Everyone Deserves Proximity
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>Your growth is not a group project.<br /><br />The people you love may not love your evolution.<br />Your circle might cheer for the old version of you — the one who didn’t set boundaries, who stayed quiet, who went with the flow.<br /><br />But the flow isn’t always divine. Sometimes the flow leads straight off a cliff.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            Pay attention to who’s encouraging your slope.<br />That friend who always “just wants to turn up.”<br />That family member who minimizes your wins.<br />That partner who only supports you when you’re shrinking.
          </div>
        </div>

        {/* The Patterns We Mistake for Personality */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-300 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            The Patterns We Mistake for Personality
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>Some of us call it “just how I am.”<br />But let’s be honest — some of it is just unhealed.<br /><br />Procrastination isn’t your personality. It’s a slope.<br />So is emotional avoidance.<br />So is self-sabotage dressed up as perfectionism.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            If the behavior is costing you peace, purpose, or momentum… it’s not just a quirk. It’s a trap — and it’s pulling you down, slow enough to feel normal, fast enough to hurt you.
          </div>
        </div>

        {/* Places That Feel Like Home… But Aren’t */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold">
            <MapPin className="w-5 h-5" />
            Places That Feel Like Home… But Aren’t
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>We all have environments that feel familiar — but they’re quietly keeping us stuck.<br /><br />That neighborhood you won’t leave because it’s “comfortable.”<br />That job you won’t outgrow because they “need you.”<br />That bar, that feed, that timeline… where the slope is always trending down.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            Familiar isn’t the same as safe.<br />Comfortable isn’t the same as aligned.<br /><br />Sometimes the slope starts when we stop being brave enough to relocate.
          </div>
        </div>

        {/* Let’s Flip the Mirror */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-semibold">
            <Eye className="w-5 h-5" />
            Let’s Flip the Mirror
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>You might not just be on a slope — you might be the slope for somebody else.<br /><br />If your energy pulls people backwards…<br />If your advice reinforces their dysfunction…<br />If your silence enables their spiral…<br /><br />Then you’re not a bystander. You’re an accomplice.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            We don’t just protect ourselves at No Window Shopping.<br />We protect our people, too.
          </div>
        </div>

        {/* Call It What It Is */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-300 font-semibold">
            <Shield className="w-5 h-5" />
            Call It What It Is
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>This isn’t about blame — it’s about awareness.<br /><br />When you realize who and what is making your slope steeper…<br />You get to make new decisions.<br /><br />You set new boundaries.<br />You choose new environments.<br />You give yourself permission to evolve without permission.</p>
          </div>
        </div>

        {/* Final Word */}
        <div className="mt-16 text-center">
          <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Slippery slopes get steeper when we surround ourselves with small thinking, expired loyalty, and pressure to play small.</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">But you were never meant to shrink just to fit in.<br />You’re meant to stand up, level up, and pull up whoever’s ready to climb with you.</div>
          <div className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-4">Next up in Part 3:<br />We talk about how to break the cycle — not just stop sliding, but rebuild your footing for good.<br /><br />Because falling isn’t failure.<br />Staying there is.</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-6">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
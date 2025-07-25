import React from 'react';
import { Clock, Trophy, Clock as TimeIcon, TrendingUp, Flag } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostPeakedHS1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 dark:from-pink-900 dark:via-blue-900 dark:to-yellow-900">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">I’m Sorry You Peaked in High School (But It’s Time to Grow Now)</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>There’s a special kind of pain in watching someone you love still live in the glory days.</p>
        <p>Still talking about the touchdowns.<br />Still reposting prom pics like it happened last semester.<br />Still moving through life with the same mindset they had when they were 17 and invincible.</p>
        <p>To those folks, I say this with love:<br /><b>I’m sorry you peaked in high school. But it’s time to grow.</b></p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Trophy className="w-6 h-6 text-yellow-500" /> 1. Nostalgia is Not a Personality</h2>
        <p>There’s nothing wrong with remembering your wins.<br />But when your entire identity is rooted in who you used to be, you leave no space for who you could become.</p>
        <p>Too many people got addicted to being the big fish in a small pond—then refused to swim in deeper waters.</p>
        <p>You can’t evolve if you’re still living in a story that’s over.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><TimeIcon className="w-6 h-6 text-blue-500" /> 2. Glory Days Can Become Growth Traps</h2>
        <p>You might be stuck if:</p>
        <ul>
          <li>You still compare everyone you date to your high school sweetheart</li>
          <li>You still reference your old popularity like it’s currency</li>
          <li>You haven’t built new wins that feel worth talking about</li>
        </ul>
        <p>That’s not legacy. That’s emotional squatters’ rights in a chapter that’s been closed for years.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><TrendingUp className="w-6 h-6 text-green-500" /> 3. The World Has Moved On — And You Deserve To, Too</h2>
        <p>There’s life beyond that old letterman jacket.<br />There’s purpose beyond that title you used to have.<br />There’s love, impact, and new identity waiting for you on the other side of release.</p>
        <p>You just have to be willing to step into now.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Flag className="w-6 h-6 text-blue-700" /> 4. The NWS Way: Respect the Past, But Don’t Camp There</h2>
        <p>At No Window Shopping, we believe in honoring your story—without getting stuck in a single chapter.</p>
        <p>It’s okay if your younger self had the spotlight. But don’t let them steal your future, too.</p>
        <p className="font-semibold">The best version of you hasn’t been seen yet.<br />Let’s not peak at 17 when 37 could be your masterpiece.</p>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-yellow-900">— Brian</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
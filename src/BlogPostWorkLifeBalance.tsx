import React from 'react';
import { Clock, ShieldCheck, PauseCircle, Zap, Heart } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostWorkLifeBalance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-green-200 dark:from-blue-900 dark:via-green-900 dark:to-green-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Work-Life Balance Isn’t a Myth — You’re Just Not Allowed to Chase It Loudly</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>Let’s get one thing clear:<br />
        Work-life balance isn’t some fantasy for rich people, artists, or tech bros.<br />
        It’s real. It’s possible.<br />
        But it requires something most people aren’t willing to say out loud: boundaries, tradeoffs, and the courage to not be constantly available.</p>
        <p>The reason it feels like a myth?<br />
        Because we’ve been conditioned to prove our worth by how busy, burnt out, or “on” we are.</p>
        <p><b>Let’s change that.</b></p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><ShieldCheck className="w-6 h-6 text-blue-500" /> 1. Balance Doesn’t Mean Equal — It Means Intentional</h2>
        <p>You’re not going to split your day 50/50 between work and joy. That’s not real life.<br />
        But balance shows up when:</p>
        <ul>
          <li>You don’t feel guilty turning your phone off at dinner</li>
          <li>You take your PTO and don’t apologize for it</li>
          <li>You build quiet time into your week, on purpose</li>
        </ul>
        <p>Balance is when you stop leaking energy into things that don’t serve your future.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Zap className="w-6 h-6 text-yellow-500" /> 2. Hustle Culture Lied to You</h2>
        <p>Grinding 24/7 is not the badge of honor it was made out to be.<br />
        Being busy isn’t the same as being successful. And being available isn’t the same as being valuable.</p>
        <p>Somewhere along the way, we confused sacrifice with status.</p>
        <p>But let me be the one to tell you:<br />
        There’s nothing glamorous about being tired all the time and calling it purpose.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><PauseCircle className="w-6 h-6 text-indigo-500" /> 3. The Grown-Up Version of Balance is Boundaries</h2>
        <p>Here’s the grown folks truth:<br />
        Work-life balance isn’t about spa days and “me time.” It’s about boundaries that are enforced, not just imagined.</p>
        <ul>
          <li>Say no without writing a paragraph</li>
          <li>Clock out without guilt</li>
          <li>Protect your weekends like your rent depends on it (because your peace does)</li>
        </ul>
        <p>No Window Shopping isn’t just about moving forward. It’s about knowing when to stop moving—for your own good.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Heart className="w-6 h-6 text-pink-500" /> 4. You Can Be Ambitious and Rested</h2>
        <p>Yes, you can chase goals and still protect your health.<br />
        Yes, you can be productive and still sleep 8 hours.<br />
        Yes, you can build wealth and still go to your kid’s game.</p>
        <p>This isn’t a myth. It’s just not loud.<br />
        Because the people doing it well aren’t performing it for social media—they’re just living it.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><ShieldCheck className="w-6 h-6 text-green-500" /> 5. The NWS Way: Move Smart. Live Fully.</h2>
        <p>At No Window Shopping, we’re not against ambition—we’re against unnecessary exhaustion.<br />
        You deserve to build something real without losing yourself in the process.</p>
        <p><b>So ask yourself:</b></p>
        <ul>
          <li>What am I working for?</li>
          <li>When do I feel most alive?</li>
          <li>What would balance look like if I stopped apologizing for needing it?</li>
        </ul>
        <p>Here’s your permission slip to redefine success your way.</p>
        <p className="font-semibold">Work-life balance isn’t a myth. It’s just a boundary away.</p>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-blue-900">— Brian</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
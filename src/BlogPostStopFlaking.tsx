import React from 'react';
import { UserCheck, Users, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

export default function BlogPostStopFlaking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-yellow-100 to-yellow-300 dark:from-red-900 dark:via-yellow-900 dark:to-yellow-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-pink-600 hover:text-pink-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stop Flaking, Start Living
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-lg font-medium mb-2">
            <UserCheck className="w-6 h-6 mr-2 text-pink-500" />
            When you ghost the plan, you’re not just flaking on your friends — you’re ghosting your own growth.
          </div>
        </div>

        {/* The Flake Pattern */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-pink-700 dark:text-pink-300 font-semibold">
            <XCircle className="w-5 h-5" />
            We’ve all done it:
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>Someone hits you with “Let’s hang out,” and you say “Bet.”<br />Then life hits. Or laziness hits.<br />And suddenly, you’re sending the “Can we rain check?” text… again.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            But here’s what you might not realize:<br />You’re not just canceling brunch.<br />You’re canceling connection.<br />You’re canceling memory-making.<br />You’re canceling the version of yourself that shows up.
          </div>
        </div>

        {/* The Myth of “I’ll Do It Later” */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-300 font-semibold">
            <Clock className="w-5 h-5" />
            The Myth of “I’ll Do It Later”
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>Later becomes never real quick.<br />And while it might seem harmless to bail on a dinner, game night, or catch-up call — it adds up. Not just in your friendships, but in your identity.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            Every time you flake, you reinforce a habit of avoiding effort.<br />And guess what? That habit doesn’t stay in your social life.<br />It bleeds into business, discipline, self-care, and decision-making.
          </div>
        </div>

        {/* Your Circle Deserves Better */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-semibold">
            <Users className="w-5 h-5" />
            Your Circle Deserves Better — So Do You
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>Showing up isn’t just about being nice to your friends.<br />It’s about being accountable to your word.<br />To your growth.<br />To your presence.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            Because presence builds trust — and trust builds networks that change your life.<br /><br />You say you want real relationships? Real support? Real opportunities?<br />That starts with being real about your time and energy.
          </div>
        </div>

        {/* If You Don’t Have Time — Say That. */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            If You Don’t Have Time — Say That.
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>It’s better to say “This week’s rough, can we lock in next Saturday?”<br />than to leave people hanging in text limbo.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            Flaking isn’t cool. It’s not mysterious. It’s not “busy energy.”<br />It’s low-effort behavior wrapped in fake productivity.
          </div>
        </div>

        {/* Here’s the Fix */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-300 font-semibold">
            <CheckCircle className="w-5 h-5" />
            Here’s the Fix:
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <ul className="list-disc pl-6 text-lg">
              <li>Make fewer plans — but keep them.</li>
              <li>Use a shared calendar with your people.</li>
              <li>Commit like it’s a job interview.</li>
              <li>Follow up. Be early. Bring good energy.</li>
              <li>You don’t need to overextend — but you do need to follow through.</li>
            </ul>
          </div>
        </div>

        {/* Final Thought */}
        <div className="mt-16 text-center">
          <div className="text-xl font-bold text-pink-700 dark:text-pink-300 mb-2">You say you want deeper friendships, more joy, real community?</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">Cool. Then don’t ghost the people trying to be in your life.</div>
          <div className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-4">Make the plan. Show up. Stay a while.<br />Because when you show up for your friends — you’re really showing up for you.</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">—</div>
          <div className="mt-6 text-gray-500">🟣 No Window Shopping is about intentional living.<br />You’re not here to browse through life.<br />You’re here to build it — one meaningful moment at a time.</div>
          <div className="mt-6 text-gray-500">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
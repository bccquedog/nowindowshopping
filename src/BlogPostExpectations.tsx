import React from 'react';
import { Clock, Target, Calendar, Heart, Zap } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostExpectations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-blue-200 dark:from-purple-900 dark:via-blue-900 dark:to-blue-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Managing Expectations — Even Your Own</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
            <span>•</span>
            <Calendar className="w-4 h-4 inline" />
            <span>July 9, 2025</span>
          </div>
        </div>
        <p>We talk a lot about how to deal with other people’s expectations—parents, partners, coworkers, friends. But what about the ones we put on ourselves?</p>
        <p>Let’s be honest: sometimes the pressure we create internally is louder, heavier, and more unrealistic than anything the outside world demands.</p>
        <p>That’s why learning to manage expectations—even your own—is one of the realest forms of emotional intelligence and personal growth.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Target className="w-6 h-6 text-red-500" /> 1. Unrealistic Expectations Are Sneaky Saboteurs</h2>
        <p>You ever set a goal, and before you even take the first step, you’ve already mapped out 10 milestones, 4 stretch goals, and a brand launch?</p>
        <p>Yeah, that.</p>
        <p>We call it ambition, but sometimes it’s just anxiety dressed up as a business plan.</p>
        <p>Setting high standards isn’t the issue—it’s setting them without context:</p>
        <ul>
          <li>Without accounting for your bandwidth</li>
          <li>Without building in time for setbacks</li>
          <li>Without grace for the version of you that still has healing to do</li>
        </ul>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Calendar className="w-6 h-6 text-blue-500" /> 2. Your Timeline Isn’t Broken—It’s Just Yours</h2>
        <p>Stop comparing your process to someone else’s post. That person with the perfect brand and 30k followers? They’ve failed more times than they’re posting about.</p>
        <p>Don’t let their “after” make you feel like your “during” is defective.</p>
        <p><b>You’re not late. You’re learning.</b></p>
        <p>And when you manage your expectations, you start to actually build momentum, not just chase it.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Heart className="w-6 h-6 text-pink-500" /> 3. Managing Expectations Doesn’t Mean Lowering Standards</h2>
        <p>It means:</p>
        <ul>
          <li>Being honest about what season you’re in</li>
          <li>Understanding what “progress” actually looks like for you</li>
          <li>Setting goals that stretch you—without breaking you</li>
        </ul>
        <p>It’s saying: <b>I will finish this, but I won’t kill myself trying to do it overnight.</b></p>
        <p>It’s asking: <b>What can I consistently commit to, without resentment?</b></p>
        <p>Because sustainable effort &gt; explosive burnout.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Target className="w-6 h-6 text-green-500" /> 4. The Internal Voice Matters Most</h2>
        <p>Managing external expectations is easier when you’ve already negotiated with your own.</p>
        <p>That voice in your head—your inner narrator—is either:</p>
        <ul>
          <li>Coaching you with grace and structure</li>
          <li>Or criticizing you with noise and shame</li>
        </ul>
        <p>You get to choose which voice gets airtime. You get to adjust the script.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Zap className="w-6 h-6 text-indigo-500" /> 5. NWS Philosophy: Aim Real. Adjust Fast. Keep Moving.</h2>
        <p>At No Window Shopping, we’re not about perfect plans or pressure-based productivity. We’re about movement with clarity.</p>
        <ul>
          <li>Know your why</li>
          <li>Respect your pace</li>
          <li>Reframe the goal when needed</li>
        </ul>
        <p>There’s strength in adapting. There’s power in progress that feels good and works.</p>
        <p>You don’t have to hustle for a highlight reel.</p>
        <p>You just have to show up with intention, keep your expectations rooted in reality, and let the rest unfold.</p>
        <p><b>So manage your energy. Manage your process. And yes—manage your expectations.</b></p>
        <p><b>Even your own.</b></p>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-blue-900">— Brian</p>
          <div className="text-sm text-gray-500 mt-2">July 9, 2025</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
import React from 'react';
import { Clock, Wind, Compass, BookOpen, RefreshCw } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostItGoesWhereItGoes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-gray-200 dark:from-blue-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">It Goes Where It Goes: 5 Words to Live By</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>I heard it on a TV show — the character said it in passing, not trying to be deep.<br />No music swelled. No dramatic pause. Just a throwaway line in the middle of a scene.</p>
        <p><b>But it stuck with me.</b></p>
        <p>It made perfect sense.<br />Five words that quietly rearranged how I looked at life, pressure, and expectations.</p>
        <p>Just think about it.</p>
        <p>How much energy do we waste trying to force outcomes?<br />Trying to control people, timelines, and plans that were never really ours to hold?</p>
        <p>Those five words don’t mean “do nothing.”<br />They mean do your part — then let life breathe.</p>
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Compass className="w-6 h-6 text-blue-500" /> The Illusion of Control</h2>
        <p>We’re taught early that control equals success.<br />That if we work hard enough, plan long enough, obsess thoroughly enough… we’ll get exactly what we want.</p>
        <p>But that’s not real life. That’s ego in disguise.</p>
        <p>Control is comforting — but most of it is an illusion.<br />We can influence, sure. Prepare, definitely.<br />But control? Nah. Not really.</p>
        <p>And that’s okay.</p>
        <p>Because when we let go of the need to micromanage every outcome, we make room for creativity, alignment, peace… even magic.</p>
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Wind className="w-6 h-6 text-blue-400" /> What Those 5 Words Actually Mean</h2>
        <p><b>It goes where it goes</b> is not passive. It’s powerful.</p>
        <p>It means:</p>
        <ul>
          <li>You did the work. Now release the grip.</li>
          <li>You said what you needed to say. Now let it land.</li>
          <li>You took the shot. Now stop checking the scoreboard every 5 seconds.</li>
        </ul>
        <p>It’s a posture of trust, not surrender.</p>
        <p>You still have standards. You still have vision.<br />But you’re not strangling the process.</p>
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><RefreshCw className="w-6 h-6 text-indigo-500" /> When You Learn to Flow, You Learn to Grow</h2>
        <p>Growth isn’t always in the grind.<br />Sometimes it’s in the quiet moments — the ones where you stop forcing and start flowing.</p>
        <p>You learn to adapt.<br />You stop panicking when plans change.<br />You become more present, less performative.</p>
        <p>That’s what those five words offer:<br /><b>A kind of spiritual exhale.</b></p>
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><BookOpen className="w-6 h-6 text-blue-600" /> Closing Thoughts: Make the Plan, But Leave Space for the Plot Twist</h2>
        <p>Yes — make your plans. Set the goals. Map the vision.</p>
        <p>But don’t get so attached to the route that you can’t handle the detours.</p>
        <p>Sometimes what feels like a setback is just life course-correcting.<br />Sometimes the thing you didn’t expect is better than what you prayed for.</p>
        <p>Leave room for the unintended.<br />The unexpected.<br />The beautifully unplanned.</p>
        <p>Because control is a comfort, not a guarantee.<br />And the truth is — it goes where it goes.</p>
        <p>Your job isn’t to grip tighter.<br />It’s to trust more.<br />To pivot with grace.<br />To keep showing up even when the script changes.</p>
        <p>And maybe, just maybe, to find peace not in how things unfold — but in knowing you stayed true regardless.</p>
        <p><b>So breathe. Let it go. Let it grow.</b></p>
        <p>Because the story's still being written…<br />and you’re exactly where you're meant to be.</p>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
import React from 'react';
import { Clock, ArrowUpRight, ShieldCheck, Volume2, DoorOpen, BookOpen } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostPeakedHS2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Healing From Someone Who Refuses to Grow</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>There’s a special kind of heartbreak that comes from watching someone you care about stay stuck.<br />Not because they can’t do better—but because they won’t.</p>
        <p>They cling to their old titles.<br />They tell the same stories.<br />They throw shade at anyone who evolves.</p>
        <p>And here you are… doing the work, breaking cycles, healing wounds—and still carrying the guilt of leaving them behind.</p>
        <p className="font-semibold">Let’s talk about that.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><ArrowUpRight className="w-6 h-6 text-green-600" /> 1. You’re Not Wrong for Growing</h2>
        <p>You’re not fake because you changed.<br />You’re not bougie because you have boundaries.<br />You’re not disloyal because you don’t want to sit around talking about things that happened 12 years ago in a school hallway.</p>
        <p>You grew.<br />They didn’t.<br />That’s not betrayal. That’s evolution.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><ShieldCheck className="w-6 h-6 text-yellow-600" /> 2. Stuck People Project Their Stagnation</h2>
        <p>You ever notice how the people who haven’t grown are the quickest to:</p>
        <ul>
          <li>Call you “brand new”</li>
          <li>Downplay your success</li>
          <li>Remind you who you used to be?</li>
        </ul>
        <p>That’s not memory. That’s emotional projection.<br />It’s easier to minimize your growth than to confront their own lack of it.</p>
        <p>Don’t internalize that noise.<br />That’s not your guilt to carry.<br />That’s their healing to choose.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Volume2 className="w-6 h-6 text-blue-600" /> 3. Stop Shrinking to Make Them Comfortable</h2>
        <p>Too often, we mute our shine around people we outgrew—hoping to keep the peace.<br />But peace that requires your silence isn’t peace.<br />It’s suppression.</p>
        <p>You don’t owe anyone a version of yourself that no longer exists.<br />And if being your whole, healed self makes them uncomfortable?<br />That’s a reflection. Not a reason to retreat.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><DoorOpen className="w-6 h-6 text-green-800" /> 4. The NWS Way: Leave the Door Open, But Keep Walking</h2>
        <p>At No Window Shopping, we grow loud.<br />We move forward with love and without guilt.<br />And we never pause our purpose waiting for someone else to choose theirs.</p>
        <p>If they ever decide to grow, they’ll know where to find you—in motion.</p>
        <p>But until then?</p>
        <ul>
          <li>Let go of the hand that keeps pulling you backward.</li>
          <li>Grieve it if you need to.</li>
          <li>But keep walking.</li>
        </ul>
        <hr />
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-200 font-semibold"><BookOpen className="w-5 h-5" /> Series Recap</div>
          <ul className="list-disc pl-6 text-base">
            <li>🟩 Part 1: I’m Sorry You Peaked in High School (But It’s Time to Grow)</li>
            <li>🟩 Part 2: Healing From Someone Who Refuses to Grow</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xl font-bold text-green-900">Because the past doesn’t need your presence. The future needs your full self.</p>
          <div className="text-xl text-gray-700 mt-4">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
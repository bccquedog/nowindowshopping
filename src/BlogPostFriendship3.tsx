import React from 'react';
import { Clock, Heart, MessageCircle, Feather, Home } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostFriendship3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 dark:from-yellow-900 dark:via-pink-900 dark:to-pink-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Friendship Series – Part 3: When You’re the One Who Was Left Behind</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>We don’t talk enough about this side of growth.</p>
        <p>Everyone celebrates the person who’s “leveling up,” “cutting ties,” “protecting their peace.”</p>
        <p>But what about the one who got left behind?<br />The one watching a friend drift away without warning.<br />The one left on read.<br />The one noticing the energy change, but unsure when it shifted—or why.</p>
        <p className="font-semibold">This one’s for you.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Heart className="w-6 h-6 text-rose-500" /> 1. Being Left Behind Doesn’t Mean You Failed</h2>
        <p>Let’s be clear:<br />You’re not less worthy because someone outgrew your space.<br />You’re not broken because someone no longer makes room for you.<br />You didn’t “do something wrong” just because the calls slowed or the invites stopped.</p>
        <p>Sometimes, people leave quietly because they’re still learning how to grow without guilt.<br />And sometimes, they’re not ready to explain a change they barely understand themselves.</p>
        <p>That doesn’t make it hurt less.<br />But it does mean you can stop blaming yourself.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><MessageCircle className="w-6 h-6 text-blue-500" /> 2. You Deserve Closure — Even If You Don’t Get It From Them</h2>
        <p>One of the hardest parts of being left behind is the silence.<br />No text. No talk. Just distance.</p>
        <p>And your brain will fill that silence with every lie it can:</p>
        <ul>
          <li>“I wasn’t enough.”</li>
          <li>“They used me.”</li>
          <li>“I must’ve been too much.”</li>
        </ul>
        <p>But the truth is simpler—and softer:<br />They were changing. And you weren’t part of that change.</p>
        <p>You get to write your own closure, even if they never give you words.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Feather className="w-6 h-6 text-indigo-500" /> 3. Grieve the Bond — Without Bitterness</h2>
        <p>You don’t have to pretend it didn’t matter.<br />You don’t have to downplay what you shared.<br />You don’t have to fake indifference just to look strong.</p>
        <p>You’re allowed to grieve.<br />To miss them.<br />To remember the good.</p>
        <p>But then you let go.<br />Not with rage. Not with revenge.<br />With release.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Home className="w-6 h-6 text-blue-700" /> 4. The NWS Way: Honor What Was, Heal What’s Now</h2>
        <p>At No Window Shopping, we don’t chase people who’ve already left.<br />But we also don’t harden our hearts to prove we’re unbothered.</p>
        <p>We feel it.<br />We reflect.<br />We refocus on the relationships that are still rooted.</p>
        <p>Sometimes being left behind is the beginning of coming home to yourself.</p>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-rose-900">— Brian</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
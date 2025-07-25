import React from 'react';
import { Clock, Flower, Droplet, Ghost, RefreshCw, BookOpen } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostFriendship4() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-yellow-200 dark:from-pink-900 dark:via-yellow-900 dark:to-yellow-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Friendship Series – Part 4: RIP – Mourn and Move On</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>Some friendships don’t need fixing.<br />They need a funeral.</p>
        <p>Not the dramatic kind.<br />Not the petty kind.<br />The real kind.</p>
        <p>The kind where you say:<br /><em>“This meant something. And it’s over. And I’m allowed to feel that.”</em></p>
        <p>Because the truth is—some relationships served their purpose. Some endings are sacred. And some grief deserves your full attention, not just a rushed distraction.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Flower className="w-6 h-6 text-blue-400" /> 1. Give the Bond a Proper Burial</h2>
        <p>You wouldn’t walk out of a loved one’s funeral without saying goodbye.<br />So why ghost your own healing?</p>
        <ul>
          <li>Write the letter you’ll never send.</li>
          <li>Cry in the car if you need to.</li>
          <li>Talk to the memory like it still exists—for a moment—just so you can finally let it go.</li>
        </ul>
        <p>Closure doesn’t always come from them.<br />Sometimes you have to give it to yourself.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Droplet className="w-6 h-6 text-indigo-400" /> 2. Mourning Is Not Weakness—It’s Maturity</h2>
        <p>The world moves too fast.<br />Social media teaches you to “cut people off,” “move like you never knew them,” and “boss up without emotions.”</p>
        <p>But here’s what maturity sounds like:</p>
        <ul>
          <li>“That hurt me more than I expected.”</li>
          <li>“I miss them sometimes, even though I know it’s over.”</li>
          <li>“I wish it ended differently, but I still choose peace.”</li>
        </ul>
        <p>You don’t have to perform strength.<br />Real strength is the kind that feels everything and still moves forward.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Ghost className="w-6 h-6 text-gray-500" /> 3. Don’t Stay Stuck in a Ghost Town</h2>
        <p>It’s easy to keep revisiting the relationship in your head, re-reading old messages, watching from afar.</p>
        <p>But grief becomes a trap when you set up camp in it.</p>
        <p>So when the mourning is done—move on.</p>
        <ul>
          <li>Delete the thread. Archive the photos.</li>
          <li>Reclaim your energy.</li>
          <li>Redirect your love toward people and spaces that reflect it back.</li>
        </ul>
        <p>You’re not abandoning the past.<br />You’re just refusing to live in it.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><RefreshCw className="w-6 h-6 text-blue-700" /> 4. The NWS Way: Reflect, Release, Rebuild</h2>
        <p>At No Window Shopping, we don’t idolize broken bonds.<br />We reflect with honesty, release with intention, and rebuild with integrity.</p>
        <ul>
          <li>Say the goodbye.</li>
          <li>Speak the truth.</li>
          <li>Mourn the loss.</li>
          <li>And then live again.</li>
        </ul>
        <p>Because the best way to honor a friendship that meant something… is to not let it stop you from becoming who you’re still meant to be.</p>
        <hr />
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-200 font-semibold"><BookOpen className="w-5 h-5" /> Series Recap</div>
          <ul className="list-disc pl-6 text-base">
            <li>🟦 Part 1: What Is a True Friend… and What Does It Cost?</li>
            <li>🟦 Part 2: How to Outgrow a Friendship Without Guilt</li>
            <li>🟦 Part 3: When You’re the One Who Was Left Behind</li>
            <li>🟦 Part 4: RIP – Mourn and Move On</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xl font-bold text-blue-900">You loved them. You lost them. You learned.</p>
          <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">Now let it rest.<br />And let you rise.</p>
          <div className="text-xl text-gray-700 mt-4">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
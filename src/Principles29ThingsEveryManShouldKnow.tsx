import React, { useState } from 'react';
import CommentsSection from './components/CommentsSection';

const lessons = [
  { title: 'How to Lead Without Ego', detail: 'Leadership isn’t dominance. It’s responsibility, influence, and knowing when to follow.' },
  { title: 'How to Sit in Silence Without Escaping', detail: 'Every man should be able to sit alone with his thoughts without needing a distraction.' },
  { title: 'How to Apologize Without Justifying', detail: '“I’m sorry” is a full sentence. Don’t dress it up. Don’t make excuses. Own it.' },
  { title: 'How to Fight for Something Without Fighting Everything', detail: 'Discernment is power. You don’t have to swing at every pitch.' },
  { title: 'How to Be Present', detail: 'Not just in body — but in mind, heart, and spirit. Put the phone down. Look people in the eye.' },
  { title: 'How to Budget Money and Emotions', detail: 'Don’t let your spending or your anger run on impulse. Self-control builds legacy.' },
  { title: 'How to Listen Without Needing to Fix', detail: 'Sometimes, the most masculine thing you can do is just listen.' },
  { title: 'How to Build, Not Just Hustle', detail: 'Grinding is temporary. Building is generational. Know the difference.' },
  { title: 'How to Handle Rejection With Grace', detail: 'It’s not always personal. Learn, pivot, and stay grounded.' },
  { title: 'How to Admit You Were Wrong', detail: 'Accountability isn’t weakness. It’s maturity.' },
  { title: 'How to Say “I Don’t Know”', detail: 'There’s power in asking questions. Growth starts where certainty ends.' },
  { title: 'How to Dress for Who You Want to Be', detail: 'Style is silent storytelling. Show up like you give a damn — even when no one’s watching.' },
  { title: 'How to Keep Your Word (Even When It’s Inconvenient)', detail: 'Your word is your weight. Say less. Mean more.' },
  { title: 'How to Maintain a Home', detail: 'Know how to fix a leak, unclog a drain, change a tire, and protect your space.' },
  { title: 'How to Speak from the Heart', detail: 'Vulnerability isn’t soft — it’s strength under control.' },
  { title: 'How to Defend Without Demeaning', detail: 'Protect people. But don’t become what you’re protecting them from.' },
  { title: 'How to Disagree Without Disrespecting', detail: 'Real men can stand their ground without burning bridges.' },
  { title: 'How to Handle Grief and Keep Moving', detail: 'You’re allowed to hurt — just don’t stay stuck there forever.' },
  { title: 'How to Navigate Love Without Losing Yourself', detail: 'Give deeply. Love freely. But remember who you are in the process.' },
  { title: 'How to Leave When It’s Time', detail: 'Jobs. Relationships. Environments. Don’t linger out of fear. Exit with dignity.' },
  { title: 'How to Plan for the Future Without Escaping the Present', detail: 'Have vision. But don’t miss what’s in front of you chasing what’s ahead.' },
  { title: 'How to Cook at Least 3 Signature Meals', detail: 'You don’t need to be a chef. But you should be able to nourish someone — including yourself.' },
  { title: 'How to Take a Compliment Without Shrinking', detail: 'Receive it. Say thank you. Stop brushing it off.' },
  { title: 'How to Have Friends Who Hold You to a Higher Standard', detail: 'Every man needs brothers — not just drinking buddies.' },
  { title: 'How to Rest Without Guilt', detail: 'Burnout is not a badge of honor. Rest like it’s part of the plan.' },
  { title: 'How to Let Go of What No Longer Serves You', detail: 'Bitterness, envy, comparison — release it. It’s heavy.' },
  { title: 'How to Speak Life Over Others', detail: 'Affirm. Encourage. Uplift. Be the reason someone didn’t give up today.' },
  { title: 'How to Make Peace With Your Past', detail: 'You’re not who you were. You’re who you’re becoming.' },
  { title: 'How to Build a Legacy Bigger Than You', detail: 'It’s not just about money. It’s about character, influence, and impact.' },
];

const Principles29ThingsEveryManShouldKnow: React.FC = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  const filtered = lessons.filter((l, i) =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.detail.toLowerCase().includes(search.toLowerCase()) ||
    (i + 1).toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-blue-900 dark:to-green-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900 dark:text-green-200">29 Things Every Man Should Know</h1>
        <p className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300">Essential lessons for leadership, character, and legacy. Click a lesson to expand. Search for keywords or lesson numbers below.</p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search lessons..."
          className="w-full mb-6 px-4 py-2 rounded border border-blue-200 dark:border-green-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="space-y-4">
          {filtered.map((l, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-blue-100 dark:border-green-900">
              <button
                className="flex items-center w-full text-left focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-xl font-bold text-blue-700 dark:text-green-200 mr-4">Lesson #{i + 1}</span>
                <span className="truncate text-gray-800 dark:text-gray-100 font-semibold">{l.title}</span>
                <span className="ml-auto text-gray-400">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="mt-4 text-gray-700 dark:text-gray-200 text-base animate-fade-in">
                  {l.detail}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mt-12 px-4">
          <CommentsSection />
        </div>
      </div>
    </div>
  );
};

export default Principles29ThingsEveryManShouldKnow; 
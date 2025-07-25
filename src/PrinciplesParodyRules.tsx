import React, { useState } from 'react';
import CommentsSection from './components/CommentsSection';

const parodyRules = [
  { number: 1, title: 'Never Window Shop on an Empty Stomach', detail: 'You’ll end up buying things you don’t need, like a $12 gluten-free candle.' },
  { number: 2, title: 'If You Can’t Pronounce It, You Can’t Afford It', detail: 'If the brand name sounds like a sneeze, keep walking.' },
  { number: 3, title: 'Always Pretend You’re “Just Looking”', detail: 'Even if you’re holding three bags and a receipt.' },
  { number: 4, title: 'The Sale Rack is a Mirage', detail: 'It’s not a deal if you didn’t want it before you saw the sticker.' },
  { number: 5, title: 'Never Make Eye Contact with the Store Greeter', detail: 'They sense weakness.' },
  { number: 6, title: 'Try On Sunglasses You’ll Never Buy', detail: 'Bonus points for taking a selfie and walking out.' },
  { number: 7, title: 'If You Drop It, You Bought It (Emotionally)', detail: 'You’ll think about that mug for weeks.' },
  { number: 8, title: 'Never Trust a Mannequin', detail: 'It’s never going to look that good on you. Or anyone.' },
  { number: 9, title: 'The More Bags You Carry, the More Lost You Look', detail: 'But you’ll feel like a boss.' },
  { number: 10, title: 'If You Find a Parking Spot Up Front, Buy a Lottery Ticket', detail: 'It’s your lucky day. Don’t waste it on socks.' },
  // Add more parody rules as desired
];

const PrinciplesParodyRules: React.FC = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  const filtered = parodyRules.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.detail.toLowerCase().includes(search.toLowerCase()) ||
    r.number.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-yellow-900 dark:via-pink-900 dark:to-blue-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-800 dark:text-yellow-200">NoWindowShopping Parody Rules</h1>
        <p className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300">A serious, professional, but comedic take on the rules of NoWindowShopping. Click a rule to expand. Search for keywords or rule numbers below.</p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search parody rules..."
          className="w-full mb-6 px-4 py-2 rounded border border-pink-200 dark:border-yellow-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <div className="space-y-4">
          {filtered.map((r, i) => (
            <div key={r.number} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-pink-100 dark:border-yellow-900">
              <button
                className="flex items-center w-full text-left focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-xl font-bold text-pink-700 dark:text-yellow-200 mr-4">Rule #{r.number}</span>
                <span className="truncate text-gray-800 dark:text-gray-100 font-semibold">{r.title}</span>
                <span className="ml-auto text-gray-400">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="mt-4 text-gray-700 dark:text-gray-200 text-base animate-fade-in">
                  {r.detail}
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

export default PrinciplesParodyRules; 
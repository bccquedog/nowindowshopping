import React from 'react';
import { DollarSign, TrendingUp, ShieldCheck, BookOpen, ArrowDownUp, PiggyBank, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

const laws = [
  {
    icon: <ArrowDownUp className="w-7 h-7 text-blue-500" />,
    title: "1. Know What’s Coming In (and Going Out)",
    desc: (
      <>
        <p>If you don’t know your cash flow, you’re already behind. You can’t outrun what you don’t track.</p>
        <div className="mt-2 text-blue-700 dark:text-blue-300 font-semibold">💡 Track every dollar. Budget like your future depends on it — because it does.</div>
        <p className="mt-2">Stop guessing. Start managing. Financial freedom starts with financial honesty.</p>
      </>
    )
  },
  {
    icon: <PiggyBank className="w-7 h-7 text-green-500" />,
    title: "2. Save Like Your Dreams Are on Layaway",
    desc: (
      <>
        <p>Emergency fund? Non-negotiable. Dream trip, down payment, business launch? Start stacking.</p>
        <div className="mt-2 text-green-700 dark:text-green-300 font-semibold">💡 Pay yourself first — every time you get paid.</div>
        <p className="mt-2">Put your dreams on autopay. The future you is counting on present you to prepare.</p>
      </>
    )
  },
  {
    icon: <XCircle className="w-7 h-7 text-red-500" />,
    title: "3. Ditch the Debt (Strategically)",
    desc: (
      <>
        <p>Not all debt is evil — but most of it is expensive. Especially when it’s tied to guilt, panic, or impulse.</p>
        <div className="mt-2 text-red-700 dark:text-red-300 font-semibold">💡 Prioritize high-interest balances. Snowball or avalanche it — just don’t ignore it.</div>
        <p className="mt-2">Your money should serve you, not own you. Cancel the interest party you’ve been funding for banks.</p>
      </>
    )
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-purple-500" />,
    title: "4. Invest Early, Invest Often",
    desc: (
      <>
        <p>Compound interest is time’s gift to the patient. The sooner you start, the easier the climb.</p>
        <div className="mt-2 text-purple-700 dark:text-purple-300 font-semibold">💡 Start small. Stay consistent. Let the markets do their thing.</div>
        <p className="mt-2">Don’t wait until you “make more.” Start now with what you do have. Time beats timing.</p>
      </>
    )
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-yellow-500" />,
    title: "5. Protect the Bag",
    desc: (
      <>
        <p>You wouldn’t leave your phone unlocked in a crowd. So why leave your assets unprotected?</p>
        <div className="mt-2 text-yellow-700 dark:text-yellow-300 font-semibold">💡 Insurance. Wills. Password managers. Don't just build wealth — defend it like it’s your legacy (because it is).</div>
        <p className="mt-2">If something happened to you tomorrow, would your people know where to start? Wealth without structure is just luck waiting to leak.</p>
      </>
    )
  },
  {
    icon: <BookOpen className="w-7 h-7 text-indigo-500" />,
    title: "6. Keep Learning or Stay Broke",
    desc: (
      <>
        <p>Financial literacy isn’t a one-time class. It’s a lifestyle.</p>
        <div className="mt-2 text-indigo-700 dark:text-indigo-300 font-semibold">💡 Read. Ask. Audit yourself. Money rules change — stay dangerous.</div>
        <p className="mt-2">Every upgrade in life requires a financial upgrade too. You’re not just stacking dollars — you’re stacking discipline.</p>
      </>
    )
  }
];

export default function BlogPostNWSLaws() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-yellow-100 dark:from-indigo-900 dark:via-blue-900 dark:to-yellow-200">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The 6 NWS Laws of Financial Literacy
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-lg font-medium mb-2">
            <DollarSign className="w-6 h-6 mr-2 text-green-500" />
            Because money shouldn’t confuse you — it should work for you.
          </div>
          <div className="text-indigo-700 dark:text-indigo-300 font-semibold mb-2">We don’t play about money over here.</div>
          <div className="text-gray-500 mb-2">Because confusion keeps people broke. And clarity? That’s what sets people free.</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">Whether you make $50K or $500K, these 6 NWS Laws will shift how you move — not just with your wallet, but with your life.</div>
        </div>

        {/* Laws */}
        <div className="space-y-10">
          {laws.map((law, idx) => (
            <div key={law.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-start gap-6 hover:shadow-2xl transition-all">
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-blue-100 dark:from-yellow-900 dark:to-blue-900">
                {law.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{law.title}</h2>
                <div className="text-gray-700 dark:text-gray-300 text-lg">{law.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Outro */}
        <div className="mt-16 text-center">
          <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">🟣 At No Window Shopping, we move different.</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">We build money muscles. We plan with purpose.<br />We don’t wait until it’s too late to learn — we get ahead.</div>
          <div className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">Because financial freedom isn’t just the goal —<br />it’s the entry ticket to the life you deserve.</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">Now go get what’s yours.</div>
          <div className="mt-6 text-gray-500">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
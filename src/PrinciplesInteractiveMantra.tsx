import React, { useState } from 'react';

const principles = [
  {
    icon: '🎯',
    title: 'Move with Intention',
    details: `Life isn’t a mall stroll. You’re not just here to browse. Every day is a chance to get closer to the version of yourself you claim to want. Don’t wait for clarity—create it. Make moves that align with the life you’re building, not the one you’re just tolerating.`,
    prompt: 'What is one area of your life where you can move with more intention this week?'
  },
  {
    icon: '🪞',
    title: 'Be Accountable to Yourself First',
    details: `Forget the applause. Forget the critics. If you can’t look yourself in the mirror and say, “I kept my word,” then the rest doesn’t matter. Self-accountability is the foundation. You are your own receipt—proof that you showed up.`,
    prompt: 'How will you hold yourself accountable today?'
  },
  {
    icon: '🔑',
    title: 'You Don’t Need Permission',
    details: `You don’t need a cosign to start. Not from your job. Not from your parents. Not from Instagram. If it’s in you, that’s enough. Take up space. Launch the thing. Write the story. Say what you mean. Permission is the excuse—action is the answer.`,
    prompt: 'What’s one thing you want to do that you’ve been waiting for permission to start?'
  },
  {
    icon: '💔',
    title: 'Stop Cheating on Yourself',
    details: `You wouldn’t let someone keep lying to you, standing you up, or not showing up. So why do it to yourself? Every skipped workout, ignored idea, or missed opportunity is a betrayal. Either you’re in this with you—or you’re not. Be loyal to your vision.`,
    prompt: 'What promise to yourself will you keep this week?'
  },
  {
    icon: '🎤',
    title: 'Show Up Before You Blow Up',
    details: `The grind isn’t sexy, but it’s necessary. Stop waiting for the big break to start behaving like you matter. Act like it’s already happening. Dress for the meeting you want, post like someone’s watching, work like the room’s full—even when it’s empty.`,
    prompt: 'How can you show up for yourself before the world notices?'
  },
  {
    icon: '🏗️',
    title: 'Build the Damn Thing',
    details: `Ideas are cheap. Execution is elite. Talk less. Build more. You don’t need another think piece or another strategy call—you need the courage to ship it. There’s power in finished. There’s freedom in done.`,
    prompt: 'What project or idea will you finish this month?'
  },
  {
    icon: '✅',
    title: 'Say Yes—But Mean It',
    details: `Half-yeses are whole lies. Don’t agree to things you don’t intend to honor. You’re not flaky—you’re overwhelmed, misaligned, or unsure. That’s fine. But be honest about it. Every yes you give dilutes the power of the ones that matter.`,
    prompt: 'What is one thing you need to say “no” to, so your “yes” means more?'
  },
  {
    icon: '💸',
    title: 'Budget Your Energy Like Your Money',
    details: `Some people, places, and habits are overdrafting your peace. You wouldn’t spend your last $20 on nonsense—so why give your last ounce of mental focus to distractions? Energy is a resource. Guard it. Spend it where it pays you back.`,
    prompt: 'Where are you spending energy that doesn’t pay you back?'
  },
  {
    icon: '🏷️',
    title: 'Don’t Window Shop Your Worth',
    details: `You were never made for the clearance rack. Stop shrinking in rooms that benefit from your silence. Stop staying in situations that confuse access with value. You are not too much. You are exactly enough. And you’re worth the full price.`,
    prompt: 'How will you claim your full worth this week?'
  },
  {
    icon: '🌀',
    title: 'It Goes Where It Goes',
    details: `Control is comforting—but it’s also an illusion. Sometimes the detour is the destination. Plans shift. Timing moves. Let the journey breathe. Leave room for magic. You do your part—and let life do its.`,
    prompt: 'Where can you let go and trust the process more?'
  },
  {
    icon: '🌟',
    title: 'Live the Mantra',
    details: `Make these principles your daily practice. The mantra isn’t just words—it’s a way of life. Show up, invest in yourself, and claim your success.`,
    prompt: 'Which principle will you focus on living out today?'
  },
];

const borderColors = [
  'border-blue-400',
  'border-pink-400',
  'border-yellow-400',
  'border-green-400',
  'border-purple-400',
  'border-indigo-400',
  'border-teal-400',
  'border-orange-400',
  'border-red-400',
  'border-cyan-400',
  'border-fuchsia-400',
  'border-emerald-400',
];

const PrinciplesInteractiveMantra: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggle = (idx: number) => {
    setExpanded(expanded => {
      const next = expanded.includes(idx)
        ? expanded.filter(i => i !== idx)
        : [...expanded, idx];
      if (next.length === principles.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      }
      return next;
    });
  };

  const progress = Math.round((expanded.length / principles.length) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-gray-800 tracking-widest">NoWindowShopping Principles</h1>
      <p className="text-lg md:text-xl text-center text-gray-600 mb-8 max-w-2xl">Click each card to reveal the principle. Unlock all {principles.length} for the full experience!</p>
      <div className="w-full max-w-3xl mb-8">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-blue-400 via-pink-300 to-yellow-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">{expanded.length} / {principles.length} unlocked</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {principles.map((p, idx) => (
          <div
            key={p.title}
            className={`cursor-pointer transition-all duration-300 bg-white rounded-2xl shadow-md border-2 ${borderColors[idx % borderColors.length]} p-6 flex flex-col items-center relative hover:shadow-xl ${expanded.includes(idx) ? 'ring-2 ring-blue-200 scale-105' : ''}`}
            onClick={() => toggle(idx)}
            style={{ animation: 'fadeInUp 0.5s', animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{p.icon}</span>
              <h2 className="text-xl font-bold text-gray-800 text-center group-hover:underline">{p.title}</h2>
            </div>
            <div className={`transition-all duration-300 text-gray-700 text-base text-center ${expanded.includes(idx) ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>{p.details}</div>
            {expanded.includes(idx) && (
              <div className="mt-4 w-full bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm text-gray-600">
                <span className="font-semibold text-blue-500">Reflection:</span> {p.prompt}
              </div>
            )}
            {!expanded.includes(idx) && <span className="mt-4 text-gray-400 text-2xl">▼</span>}
            {expanded.includes(idx) && <span className="mt-4 text-blue-400 text-2xl">✔️</span>}
          </div>
        ))}
      </div>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <span className="text-6xl animate-bounce">🎉</span>
        </div>
      )}
    </div>
  );
};

export default PrinciplesInteractiveMantra; 
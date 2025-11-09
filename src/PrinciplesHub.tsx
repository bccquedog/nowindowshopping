import React from 'react';
import { Link } from 'react-router-dom';

const principles = [
  {
    title: 'NoWindowShopping Principles',
    description: 'Engage with the principles in a hands-on, interactive way.',
    to: '/principles/interactive-mantra',
    icon: '🛒',
  },
  {
    title: 'Rules to Wedding Crashing',
    description: 'All 110 rules of Wedding Crashing from the "Wedding Crashers" bonus feature.',
    to: '/principles/wedding-crashing',
    icon: '🎩',
  },
  {
    title: 'NoWindowShopping Parody Rules',
    description: 'A serious, professional, but comedic take on the rules of NoWindowShopping.',
    to: '/principles/parody-rules',
    icon: '🤡',
  },
  {
    title: '29 Things Every Man Should Know',
    description: 'Essential lessons for leadership, character, and legacy.',
    to: '/principles/29-things-every-man-should-know',
    icon: '🧑‍🔧',
  },
  // Future sub-cards can be added here
];



const PrinciplesHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-yellow-900 dark:to-blue-900 py-8 sm:py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-900 dark:text-yellow-200 px-2">Principles of NoWindowShopping</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {principles.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center hover:scale-105 transition-transform border border-blue-100 dark:border-yellow-900"
          >
            <div className="text-4xl sm:text-5xl mb-4">{p.icon}</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-blue-800 dark:text-yellow-200 text-center leading-tight">{p.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm sm:text-base leading-relaxed">{p.description}</p>
          </Link>
        ))}

        {/* Placeholder for future sub-cards */}
      </div>
    </div>
  </div>
);

export default PrinciplesHub; 
import React from 'react';
import { Link } from 'react-router-dom';

const slipperySlopesParts = [
  {
    title: 'Part 1: The Slippery Slopes of Success',
    to: '/blog/slippery-slopes-1',
    summary: 'How small compromises can lead to big consequences in your career and life.'
  },
  {
    title: 'Part 2: Staying True When It Gets Hard',
    to: '/blog/slippery-slopes-2',
    summary: 'Strategies for holding your ground and keeping your integrity under pressure.'
  },
  {
    title: 'Part 3: Climbing Back Up',
    to: '/blog/slippery-slopes-3',
    summary: 'How to recover, rebuild, and regain trust after a misstep.'
  }
];

const SlipperySlopesHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">Slippery Slopes Series</h1>
      <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-8">Explore the journey of ambition, temptation, and redemption in this 3-part series.</p>
      <div className="space-y-6">
        {slipperySlopesParts.map((part) => (
          <Link
            key={part.to}
            to={part.to}
            className="block bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300 group"
          >
            <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{part.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{part.summary}</p>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">Read This Part →</span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default SlipperySlopesHub; 
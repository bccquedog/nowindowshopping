import React from 'react';
import { Link } from 'react-router-dom';

const peakedHSParts = [
  {
    title: 'Part 1: Peaked in High School?',
    to: '/blog/peaked-hs-1',
    summary: 'Exploring the myth and reality of “peaking” early—and what comes next.'
  },
  {
    title: 'Part 2: Redefining Success After Graduation',
    to: '/blog/peaked-hs-2',
    summary: 'How to find new purpose, growth, and meaning beyond your high school glory days.'
  }
];

const PeakedHSHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">Peaked in High School Series</h1>
      <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-8">A 2-part series on growth, reinvention, and finding your next chapter.</p>
      <div className="space-y-6">
        {peakedHSParts.map((part) => (
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

export default PeakedHSHub; 
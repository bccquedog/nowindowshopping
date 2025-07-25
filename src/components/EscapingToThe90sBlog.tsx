import React from 'react';
import { Link } from 'react-router-dom';

const parts = [
  {
    title: "Part 1: Why We're All Escaping to the 90s",
    to: '/blog/escaping-to-the-90s-1',
    summary: 'Overstimulated, overwhelmed, and unconsciously reaching for a simpler time. Why nostalgia is a coping mechanism and the 90s are our emotional safe place.'
  },
  {
    title: 'Part 2: Overstimulated Minds, Understimulated Souls',
    to: '/blog/escaping-to-the-90s-2',
    summary: 'Why adulthood is exhausting, how the 90s soothe us, and what we miss about the texture of life.'
  },
  {
    title: 'Part 3: Everything Was New Then',
    to: '/blog/escaping-to-the-90s-3',
    summary: 'Why the 90s felt magical, the neurochemistry of firsts, and how to reclaim wonder in a busy world.'
  }
];

const EscapingToThe90sBlog: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-yellow-900 dark:via-pink-900 dark:to-blue-900 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Escaping to the 90s</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A 3-part blog series exploring why we’re all nostalgic for the 90s, how overstimulation shapes us, and how to rediscover wonder. Start with any part, or read them in order!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-10">
        {parts.map((part) => (
          <Link
            key={part.to}
            to={part.to}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {part.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {part.summary}
            </p>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
              Read This Part →
            </span>
          </Link>
        ))}
      </div>
      <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800 text-center">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2">Series Recap</h3>
        <ul className="list-disc pl-6 text-base text-left inline-block">
          <li>📼 Part 1: Why We're All Escaping to the 90s</li>
          <li>📼 Part 2: Overstimulated Minds, Understimulated Souls</li>
          <li>📼 Part 3: Everything Was New Then</li>
        </ul>
      </div>
    </div>
  </div>
);

export default EscapingToThe90sBlog; 
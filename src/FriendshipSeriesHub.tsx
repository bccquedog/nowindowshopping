import React from 'react';
import { Link } from 'react-router-dom';

const friendshipParts = [
  {
    title: 'Part 1: What Is a True Friend… and What Does It Cost?',
    to: '/blog/friendship-1',
    summary: 'Defines what real friendship looks like, and challenges readers to examine the price of building (and maintaining) true connection.'
  },
  {
    title: 'Part 2: How to Outgrow a Friendship Without Guilt',
    to: '/blog/friendship-2',
    summary: 'A grounded, compassionate guide for recognizing when a relationship no longer fits—and how to adjust with grace.'
  },
  {
    title: 'Part 3: When You’re the One Who Was Left Behind',
    to: '/blog/friendship-3',
    summary: 'Shifts the perspective: explores the pain and confusion of being outgrown, and how to heal without internalizing rejection.'
  },
  {
    title: 'Part 4: RIP – Mourn and Move On',
    to: '/blog/friendship-4',
    summary: 'Closure-focused. Helps readers honor the friendship as something sacred that served its purpose, and guides them through the emotional process of letting go fully.'
  }
];

const FriendshipSeriesHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Friendship Series</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A 4-part journey by Brian Proctor exploring the meaning, cost, and evolution of true friendship. Each part stands alone, but together they tell a story of growth, loss, and healing.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-10">
        {friendshipParts.map((part) => (
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
          <li>🟦 Part 1: What Is a True Friend… and What Does It Cost?</li>
          <li>🟦 Part 2: How to Outgrow a Friendship Without Guilt</li>
          <li>🟦 Part 3: When You’re the One Who Was Left Behind</li>
          <li>🟦 Part 4: RIP – Mourn and Move On</li>
        </ul>
      </div>
    </div>
  </div>
);

export default FriendshipSeriesHub; 
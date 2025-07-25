import React from 'react';
import { Link } from 'react-router-dom';

const seatAtTableParts = [
  {
    title: 'Part 1: Earning Your Seat',
    to: '/blog/seat-at-table-1',
    summary: 'What it really takes to get invited to the table—and how to prepare for your moment.'
  },
  {
    title: 'Part 2: Speaking Up Without Selling Out',
    to: '/blog/seat-at-table-2',
    summary: 'How to use your voice, stay authentic, and make an impact once you’re there.'
  },
  {
    title: 'Part 3: When the Table Isn’t for You',
    to: '/blog/seat-at-table-3',
    summary: 'Recognizing when it’s time to build your own table and invite others.'
  },
  {
    title: 'Part 4: The Power of Invitation',
    to: '/blog/seat-at-table-4',
    summary: 'How to open doors for others and create a culture of inclusion.'
  }
];

const SeatAtTableHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">Seat at the Table Series</h1>
      <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-8">A 4-part series on access, authenticity, and building your own opportunities.</p>
      <div className="space-y-6">
        {seatAtTableParts.map((part) => (
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

export default SeatAtTableHub; 
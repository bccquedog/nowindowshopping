import React from 'react';
import { Link } from 'react-router-dom';

// Applications list - Add your hyperlinks here
const applications = [
  {
    name: 'MGCU',
    url: '/mgcu',
    description: 'Marcus Graham Connected Universe - Explore the literary world of your pen name.',
    isInternal: true
  },
  {
    name: 'Game Hub',
    url: '/games',
    description: 'Premium luxury games collection featuring Blackjack, Checkers, Tycoon, Spades, and 5000 NWS.',
    isInternal: true
  },
  {
    name: 'Application Name 1',
    url: '#', // Replace with your hyperlink
    description: 'Description of the application',
    isInternal: false
  },
  {
    name: 'Application Name 2',
    url: '#', // Replace with your hyperlink
    description: 'Description of the application',
    isInternal: false
  },
  // Add more applications as needed
];

const Applications: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-16 px-4">
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          to="/hub" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Hub
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 dark:text-blue-300 drop-shadow-lg">
        Applications
      </h1>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <ul className="space-y-4">
          {applications.map((app, index) => (
            <li key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
              {app.isInternal ? (
                <Link
                  to={app.url}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg transition-colors"
                >
                  <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                    {app.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {app.description}
                  </p>
                </Link>
              ) : (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg transition-colors"
                >
                  <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                    {app.name}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {app.description}
                  </p>
                </a>
              )}
            </li>
          ))}
        </ul>
        
        {applications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Applications list will be added here. Please provide the hyperlinks.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Applications;


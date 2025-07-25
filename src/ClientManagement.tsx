import React from 'react';
import { Link } from 'react-router-dom';

const ClientManagement: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-blue-900 py-12 px-4">
    {/* Back Button */}
    <div className="w-full max-w-lg mb-6">
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

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 max-w-lg w-full text-center">
      <div className="text-6xl mb-4 animate-bounce">🗂️</div>
      <h1 className="text-3xl font-bold mb-2 text-blue-900 dark:text-blue-100">Client Management</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Coming Soon...</p>
      <p className="text-gray-500 dark:text-gray-400">We're working hard to bring you a powerful client management experience. Stay tuned for updates!</p>
    </div>
  </div>
);

export default ClientManagement; 
import React from 'react';

const MGCUAbout: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 py-12 px-4">
    <div className="max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">About the Marcus Graham Connected Universe (MGCU)</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
        The Marcus Graham Connected Universe (MGCU) is a creative, collaborative storytelling world inspired by the vision and legacy of Marcus Graham. Here, we explore interconnected stories, characters, and ideas that celebrate imagination, community, and growth.
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400 text-center">
        This page is just the beginning. More features and content are coming soon!
      </p>
    </div>
  </div>
);

export default MGCUAbout; 
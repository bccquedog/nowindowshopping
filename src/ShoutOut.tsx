import React from 'react';

const ShoutOut: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 dark:from-pink-900 dark:via-yellow-900 dark:to-blue-900 py-12 px-4">
    <div className="max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-10 border border-gray-200 dark:border-gray-700 text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-pink-500 dark:text-pink-300 tracking-widest drop-shadow-lg">ShoutOut</h1>
      <p className="text-2xl text-gray-700 dark:text-gray-200 mb-8 font-semibold">Coming Soon</p>
      <p className="text-md text-gray-500 dark:text-gray-400">A new way to connect and celebrate is on the way. Stay tuned for updates!</p>
      {/* The Download App button is intentionally hidden/removed for now */}
    </div>
  </div>
);

export default ShoutOut; 
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Loading CoachCare...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your dashboard.
        </p>
      </div>
    </div>
  );
}; 
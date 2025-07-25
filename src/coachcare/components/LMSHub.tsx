import React from 'react';

const LMSHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-12 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-300 drop-shadow-lg">Learning Management System (LMS)</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700">
        <div className="text-6xl mb-6">📚</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Coming Soon</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Our comprehensive Learning Management System is currently under development. 
          Soon you'll have access to courses, modules, and resources to help you and your clients grow.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">What's Coming</h3>
          <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Interactive course modules and assessments</li>
            <li>• Progress tracking and achievement badges</li>
            <li>• Client-specific learning paths</li>
            <li>• Resource library and downloadable materials</li>
            <li>• Integration with CoachCare CRM</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default LMSHub; 
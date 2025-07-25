import React from 'react';

const ITServices: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-100 dark:from-gray-900 dark:via-blue-900 dark:to-green-900 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">IT Services</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Technology solutions and digital transformation services for modern businesses. We help you build, integrate, and optimize your digital infrastructure.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Core IT Services</h2>
        <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
          <li>• Software Development</li>
          <li>• System Integration</li>
          <li>• Digital Transformation</li>
          <li>• Technical Consulting</li>
          <li>• Cloud Solutions & Migration</li>
          <li>• Cybersecurity & Risk Management</li>
          <li>• IT Support & Managed Services</li>
        </ul>
      </div>
      <div className="mt-10 text-center text-blue-700 dark:text-blue-300 text-lg">
        <p>Ready to modernize your business? <br />Contact us to discuss your IT needs and get a custom solution.</p>
      </div>
    </div>
  </div>
);

export default ITServices; 
import React from 'react';

const Settings: React.FC = () => (
  <div className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Settings & Customization</h1>
      <p className="text-gray-700 mb-6 text-center">Personalize your experience and manage your account settings. More customization features coming soon!</p>
      <ul className="space-y-3 text-lg text-gray-800">
        <li>• General Settings</li>
        <li>• Notifications</li>
        <li>• Advanced Settings</li>
        <li>• Privacy & Security</li>
        <li>• Account Management</li>
      </ul>
    </div>
  </div>
);

export default Settings; 
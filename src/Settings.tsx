import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    weeklyDigest: true,
    
    // Advanced Settings
    autoSave: true,
    dataSync: true,
    analytics: true,
    debugMode: false,
    
    // Privacy & Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    dataRetention: 365,
    shareAnalytics: true,
    
    // Account Management
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    company: 'No Window Shopping'
  });

  // Dark mode functionality
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setSettings(prev => ({ ...prev, theme: savedTheme }));
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    // Apply theme immediately when changed
    if (setting === 'theme') {
      applyTheme(value);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
        <select 
          value={settings.theme}
          onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
        <select 
          value={settings.language}
          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
        <select 
          value={settings.timezone}
          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Chicago">Central Time</option>
          <option value="America/Denver">Mountain Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
        <select 
          value={settings.dateFormat}
          onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Receive important updates via email</p>
        </div>
        <button
          onClick={() => handleSettingChange('notifications', 'emailNotifications', !settings.emailNotifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get real-time alerts in your browser</p>
        </div>
        <button
          onClick={() => handleSettingChange('notifications', 'pushNotifications', !settings.pushNotifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Receive text message alerts</p>
        </div>
        <button
          onClick={() => handleSettingChange('notifications', 'smsNotifications', !settings.smsNotifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Marketing Emails</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Receive promotional content and updates</p>
        </div>
        <button
          onClick={() => handleSettingChange('notifications', 'marketingEmails', !settings.marketingEmails)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.marketingEmails ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Digest</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get a summary of your activity each week</p>
        </div>
        <button
          onClick={() => handleSettingChange('notifications', 'weeklyDigest', !settings.weeklyDigest)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.weeklyDigest ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Save</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Automatically save your work as you type</p>
        </div>
        <button
          onClick={() => handleSettingChange('advanced', 'autoSave', !settings.autoSave)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.autoSave ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.autoSave ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Sync</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sync your data across all devices</p>
        </div>
        <button
          onClick={() => handleSettingChange('advanced', 'dataSync', !settings.dataSync)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.dataSync ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.dataSync ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Help us improve by sharing usage data</p>
        </div>
        <button
          onClick={() => handleSettingChange('advanced', 'analytics', !settings.analytics)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.analytics ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.analytics ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Debug Mode</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enable advanced debugging features</p>
        </div>
        <button
          onClick={() => handleSettingChange('advanced', 'debugMode', !settings.debugMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.debugMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.debugMode ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
        </div>
        <button
          onClick={() => handleSettingChange('privacy', 'twoFactorAuth', !settings.twoFactorAuth)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Timeout (minutes)</label>
        <select 
          value={settings.sessionTimeout}
          onChange={(e) => handleSettingChange('privacy', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={120}>2 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Retention (days)</label>
        <select 
          value={settings.dataRetention}
          onChange={(e) => handleSettingChange('privacy', 'dataRetention', parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
          <option value={365}>1 year</option>
          <option value={730}>2 years</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Share Analytics</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Allow us to use your data for product improvement</p>
        </div>
        <button
          onClick={() => handleSettingChange('privacy', 'shareAnalytics', !settings.shareAnalytics)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.shareAnalytics ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.shareAnalytics ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderAccountManagement = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => handleSettingChange('account', 'firstName', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => handleSettingChange('account', 'lastName', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
        <input
          type="text"
          value={settings.company}
          onChange={(e) => handleSettingChange('account', 'company', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
          Save Changes
        </button>
        <button className="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium">
          Reset to Defaults
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'general', name: 'General Settings', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'advanced', name: 'Advanced Settings', icon: '🔧' },
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒' },
    { id: 'account', name: 'Account Management', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Settings & Customization</h1>
            <p className="text-blue-100 mt-2">Personalize your experience and manage your account</p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'advanced' && renderAdvancedSettings()}
            {activeTab === 'privacy' && renderPrivacySecurity()}
            {activeTab === 'account' && renderAccountManagement()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings; 
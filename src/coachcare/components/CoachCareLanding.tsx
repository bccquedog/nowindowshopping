import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginScreen } from './LoginScreen';

export const CoachCareLanding: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  // If user wants to login, show the full login screen
  if (showLogin) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <span className="text-white text-lg sm:text-2xl font-bold">CC</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Welcome to CoachCare
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Your comprehensive platform for coaching excellence. Whether you're a coach looking to grow your practice or a client seeking transformation, we're here to support your journey.
          </p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Sign In Option */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-4 sm:mb-6">
              <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sign In to CoachCare
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Access your dashboard, manage clients, and track your coaching journey.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3 px-6 rounded-lg transition-colors touch-manipulation"
              >
                Sign In to Existing Account
              </button>
              
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                  New to CoachCare?
                </p>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm sm:text-base touch-manipulation"
                >
                  Create a new account
                </button>
              </div>
            </div>
          </div>

          {/* Consultation Option */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-4 sm:mb-6">
              <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 bg-purple-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Book a Free Consultation
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Discover how coaching can transform your life or business. Schedule a complimentary session.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <Link
                to="/coachcare/booking"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-3 px-6 rounded-lg transition-colors text-center touch-manipulation"
              >
                Schedule Free Consultation
              </Link>
              
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  No commitment required • 30-minute session
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 sm:h-10 sm:w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Proven Results</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Transformative coaching that delivers measurable outcomes</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Secure Platform</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Your data and conversations are protected and confidential</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-8 w-8 sm:h-10 sm:w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Flexible Sessions</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Schedule sessions that fit your lifestyle and goals</p>
          </div>
        </div>

        {/* Back to Hub */}
        <div className="text-center">
          <Link
            to="/hub"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-sm sm:text-base touch-manipulation"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub
          </Link>
        </div>
      </div>
    </div>
  );
}; 
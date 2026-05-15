import React from 'react';
import { CoachCareProvider, useCoachCare } from './context';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminPortal } from './components/AdminPortal';
import { CoachPortal } from './components/CoachPortal';
import { ClientPortal } from './components/ClientPortal';
import { UserProfile } from './components/UserProfile';
import { CoachCareLanding } from './components/CoachCareLanding';

const CoachCareContent: React.FC = () => {
  const { state, actions } = useCoachCare();
  const { currentUser: user, isLoading } = state;

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show landing page if no user is logged in
  if (!user) {
    return <CoachCareLanding />;
  }

  // Handle tab switching
  const renderContent = () => {
    if (state.activeTab === 'profile') {
      return <UserProfile />;
    }

    switch (user.role) {
      case 'admin':
        return <AdminPortal />;
      case 'coach':
        return <CoachPortal />;
      case 'client':
        return <ClientPortal />;
      default:
        return <CoachCareLanding />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Navigation could go here */}
      <div className="flex-1">
        {renderContent()}
      </div>
      
      {/* Profile Toggle for demonstration */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => actions.setActiveTab(state.activeTab === 'profile' ? 'dashboard' : 'profile')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title={state.activeTab === 'profile' ? "Back to Dashboard" : "View Profile"}
        >
          {state.activeTab === 'profile' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

const CoachCareApp: React.FC = () => (
  <CoachCareProvider>
    <CoachCareContent />
  </CoachCareProvider>
);

export { CoachCareApp }; 
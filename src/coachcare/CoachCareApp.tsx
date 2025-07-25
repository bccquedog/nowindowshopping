import React from 'react';
import { CoachCareProvider, useAuth } from './context';
import { LoginScreen } from './components/LoginScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminPortal } from './components/AdminPortal';
import { CoachPortal } from './components/CoachPortal';
import { ClientPortal } from './components/ClientPortal';
import { CoachCareLanding } from './components/CoachCareLanding';

const CoachCareContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show landing page if no user is logged in
  if (!user) {
    return <CoachCareLanding />;
  }

  // Show appropriate portal based on user role
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

const CoachCareApp: React.FC = () => (
  <CoachCareProvider>
    <CoachCareContent />
  </CoachCareProvider>
);

export { CoachCareApp }; 
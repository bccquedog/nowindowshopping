import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa6';
import { notificationService } from '../notificationService';
import { useCoachCareContext } from '../context';

// Icon wrapper to fix TypeScript issues with React 19
const IconWrapper = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  return <Icon className={className} />;
};

const NotificationBell: React.FC = () => {
  const { state, actions } = useCoachCareContext();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (state.currentUser) {
      loadUnreadCount();
      // Set up polling for new notifications
      const interval = setInterval(loadUnreadCount, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [state.currentUser]);

  const loadUnreadCount = async () => {
    if (!state.currentUser) return;
    
    try {
      const count = await notificationService.getUnreadCount(state.currentUser.id);
      setUnreadCount(count);
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

  const handleClick = () => {
    actions.showModal('NotificationCenter');
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
      aria-label="Notifications"
    >
      <IconWrapper icon={FaBell} className="text-xl" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;

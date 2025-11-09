import React, { useState, useEffect } from 'react';
import { FaBell, FaXmark, FaCheck, FaTriangleExclamation, FaCircleInfo, FaStar } from 'react-icons/fa6';
import { Notification } from '../types';
import { notificationService } from '../notificationService';
import { useCoachCareContext } from '../context';

// Icon wrapper to fix TypeScript issues with React 19
const IconWrapper = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  return <Icon className={className} />;
};

const NotificationCenter: React.FC = () => {
  const { state, actions } = useCoachCareContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.currentUser) {
      loadNotifications();
    }
  }, [state.currentUser]);

  const loadNotifications = async () => {
    if (!state.currentUser) return;
    
    setIsLoading(true);
    try {
      const userNotifications = await notificationService.getNotifications(state.currentUser.id);
      const count = await notificationService.getUnreadCount(state.currentUser.id);
      setNotifications(userNotifications);
      setUnreadCount(count);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!state.currentUser) return;
    
    try {
      await notificationService.markAllAsRead(state.currentUser.id);
      await loadNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDismiss = async (notificationId: string) => {
    try {
      await notificationService.dismissNotification(notificationId);
      await loadNotifications();
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  };

  const handleAction = (notification: Notification) => {
    if (notification.actionUrl) {
      // Navigate to the action URL
      window.location.href = notification.actionUrl;
    }
    if (notification.status === 'unread') {
      handleMarkAsRead(notification.id);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'session-reminder':
        return <IconWrapper icon={FaBell} className="text-blue-500" />;
      case 'goal-deadline':
        return <IconWrapper icon={FaTriangleExclamation} className="text-orange-500" />;
      case 'assessment-due':
        return <IconWrapper icon={FaCircleInfo} className="text-purple-500" />;
      case 'payment-due':
        return <IconWrapper icon={FaTriangleExclamation} className="text-red-500" />;
      case 'achievement':
        return <IconWrapper icon={FaStar} className="text-yellow-500" />;
      default:
        return <IconWrapper icon={FaCircleInfo} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (!state.showNotificationCenter) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <IconWrapper icon={FaBell} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => actions.hideModal('NotificationCenter')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
                              <IconWrapper icon={FaXmark} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <IconWrapper icon={FaBell} className="text-4xl mx-auto mb-4 text-gray-300" />
              <p>No notifications yet</p>
              <p className="text-sm">We'll notify you when there's something important</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                    notification.status === 'unread' ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleAction(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          {notification.status === 'unread' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notification.id);
                              }}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <IconWrapper icon={FaCheck} className="text-xs" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDismiss(notification.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                                                          <IconWrapper icon={FaXmark} className="text-xs" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      {notification.actionText && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(notification);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 transition-colors"
                        >
                          {notification.actionText} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;

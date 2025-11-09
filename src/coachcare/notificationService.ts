import { Notification } from './types';

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'session-reminder',
    title: 'Upcoming Session',
    message: 'You have a session with John Doe in 30 minutes',
    priority: 'high',
    status: 'unread',
    actionUrl: '/sessions/123',
    actionText: 'View Session',
    metadata: {
      clientId: 'client1',
      sessionId: 'session123'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '2',
    userId: 'user1',
    type: 'goal-deadline',
    title: 'Goal Deadline Approaching',
    message: 'Goal "Improve Communication Skills" is due in 3 days',
    priority: 'medium',
    status: 'unread',
    actionUrl: '/goals/456',
    actionText: 'Review Goal',
    metadata: {
      clientId: 'client2',
      goalId: 'goal456'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: '3',
    userId: 'user1',
    type: 'achievement',
    title: 'Milestone Reached!',
    message: 'Congratulations! You\'ve completed 10 sessions this month',
    priority: 'low',
    status: 'unread',
    actionUrl: '/dashboard',
    actionText: 'View Dashboard',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: '4',
    userId: 'user1',
    type: 'assessment-due',
    title: 'Assessment Due',
    message: 'Client Sarah Johnson has a pending assessment',
    priority: 'medium',
    status: 'read',
    actionUrl: '/assessments/789',
    actionText: 'Complete Assessment',
    metadata: {
      clientId: 'client3',
      assessmentId: 'assessment789'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    readAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  }
];

class NotificationService {
  private notifications: Notification[] = [...mockNotifications];

  // Get all notifications for a user
  async getNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId);
  }

  // Get unread notifications count
  async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.filter(n => n.userId === userId && n.status === 'unread').length;
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.status = 'read';
      notification.readAt = new Date().toISOString();
    }
  }

  // Mark all notifications as read
  async markAllAsRead(userId: string): Promise<void> {
    this.notifications.forEach(n => {
      if (n.userId === userId && n.status === 'unread') {
        n.status = 'read';
        n.readAt = new Date().toISOString();
      }
    });
  }

  // Dismiss notification
  async dismissNotification(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.status = 'dismissed';
    }
  }

  // Create new notification
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.notifications.unshift(newNotification);
    return newNotification;
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  // Get notifications by type
  async getNotificationsByType(userId: string, type: Notification['type']): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId && n.type === type);
  }

  // Get notifications by priority
  async getNotificationsByPriority(userId: string, priority: Notification['priority']): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId && n.priority === priority);
  }

  // Create session reminder notification
  async createSessionReminder(sessionId: string, clientId: string, sessionTitle: string, reminderTime: string): Promise<Notification> {
    return this.createNotification({
      userId: 'user1', // This would be the coach's ID
      type: 'session-reminder',
      title: 'Session Reminder',
      message: `You have a session "${sessionTitle}" scheduled for ${reminderTime}`,
      priority: 'high',
      status: 'unread',
      actionUrl: `/sessions/${sessionId}`,
      actionText: 'View Session',
      metadata: {
        clientId,
        sessionId
      }
    });
  }

  // Create goal deadline notification
  async createGoalDeadline(goalId: string, clientId: string, goalTitle: string, daysUntilDue: number): Promise<Notification> {
    return this.createNotification({
      userId: 'user1',
      type: 'goal-deadline',
      title: 'Goal Deadline Approaching',
      message: `Goal "${goalTitle}" is due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}`,
      priority: daysUntilDue <= 1 ? 'urgent' : daysUntilDue <= 3 ? 'high' : 'medium',
      status: 'unread',
      actionUrl: `/goals/${goalId}`,
      actionText: 'Review Goal',
      metadata: {
        clientId,
        goalId
      }
    });
  }

  // Create achievement notification
  async createAchievementNotification(title: string, message: string, actionUrl?: string): Promise<Notification> {
    return this.createNotification({
      userId: 'user1',
      type: 'achievement',
      title,
      message,
      priority: 'low',
      status: 'unread',
      actionUrl,
      actionText: actionUrl ? 'View Details' : undefined
    });
  }
}

export const notificationService = new NotificationService();

import { 
  Client, 
  Session, 
  Goal, 
  Communication, 
  Note, 
  Assessment, 
  Invoice
} from './types';
import { authService } from './auth';

// Mock data storage - in production, this would be a real database
let mockData = {
  clients: [] as Client[],
  sessions: [] as Session[],
  goals: [] as Goal[],
  communications: [] as Communication[],
  notes: [] as Note[],
  assessments: [] as Assessment[],
  invoices: [] as Invoice[],
};

// Initialize with sample data
const initializeMockData = () => {
  mockData = {
    clients: [
      {
        id: 'client-1',
        userId: 'client-1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        address: {
          street: '123 Main St',
          street2: 'Apt 4B',
          city: 'Baltimore',
          state: 'MD',
          zip: '21201',
          country: 'USA'
        },
        status: 'active',
        coachId: 'coach-1',
        joinDate: '2024-01-15T00:00:00Z',
        lastSession: '2024-01-15T00:00:00Z',
        nextSession: '2024-01-22T00:00:00Z',
        totalRevenue: 2500,
        sessionsCompleted: 8,
        notes: 'Excellent progress on leadership development',
        preferences: {
          communicationMethod: 'email',
          sessionReminders: true,
          marketingEmails: false
        },
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'client-2',
        userId: 'client-2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '(555) 234-5678',
        address: {
          street: '456 Oak Ave',
          street2: '',
          city: 'Washington',
          state: 'DC',
          zip: '20001',
          country: 'USA'
        },
        status: 'active',
        coachId: 'coach-1',
        joinDate: '2024-01-20T00:00:00Z',
        lastSession: '2024-01-12T00:00:00Z',
        nextSession: '2024-01-19T00:00:00Z',
        totalRevenue: 1800,
        sessionsCompleted: 5,
        notes: 'Working on career transition',
        preferences: {
          communicationMethod: 'phone',
          sessionReminders: true,
          marketingEmails: true
        },
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-01-20T00:00:00Z'
      }
    ],
    sessions: [
      {
        id: 'session-1',
        clientId: 'client-1',
        coachId: 'coach-1',
        title: 'Leadership Development Session',
        type: 'follow-up',
        date: '2024-01-22T00:00:00Z',
        startTime: '10:00',
        endTime: '11:00',
        duration: 60,
        status: 'scheduled',
        price: 150,
        location: 'video',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        notes: 'Focus on communication skills',
        goals: ['Improve public speaking', 'Build team leadership'],
        actionItems: ['Practice presentation skills', 'Schedule team meeting'],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'session-2',
        clientId: 'client-2',
        coachId: 'coach-1',
        title: 'Career Transition Planning',
        type: 'progress-review',
        date: '2024-01-19T00:00:00Z',
        startTime: '14:00',
        endTime: '15:00',
        duration: 60,
        status: 'scheduled',
        price: 150,
        location: 'phone',
        notes: 'Review progress on job search',
        goals: ['Complete career transition', 'Network effectively'],
        actionItems: ['Update resume', 'Attend networking event'],
        createdAt: '2024-01-12T00:00:00Z',
        updatedAt: '2024-01-12T00:00:00Z'
      }
    ],
    goals: [
      {
        id: 'goal-1',
        clientId: 'client-1',
        title: 'Improve Leadership Communication',
        description: 'Develop confident and effective communication skills for leading teams',
        category: 'skill-development',
        targetDate: '2024-03-01T00:00:00Z',
        progress: 75,
        status: 'in-progress',
        milestones: [
          {
            id: 'milestone-1',
            title: 'Complete assertiveness training',
            completed: true,
            dueDate: '2024-01-15T00:00:00Z'
          },
          {
            id: 'milestone-2',
            title: 'Lead team meeting',
            completed: false,
            dueDate: '2024-02-15T00:00:00Z'
          }
        ],
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'goal-2',
        clientId: 'client-2',
        title: 'Complete Career Transition',
        description: 'Successfully transition from current role to new industry',
        category: 'career',
        targetDate: '2024-04-15T00:00:00Z',
        progress: 40,
        status: 'in-progress',
        milestones: [
          {
            id: 'milestone-3',
            title: 'Research target companies',
            completed: true,
            dueDate: '2024-01-10T00:00:00Z'
          },
          {
            id: 'milestone-4',
            title: 'Update resume and cover letter',
            completed: false,
            dueDate: '2024-02-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-01-20T00:00:00Z'
      }
    ],
    communications: [
      {
        id: 'comm-1',
        clientId: 'client-1',
        coachId: 'coach-1',
        type: 'email',
        subject: 'Session Reminder',
        content: 'Hi John, this is a reminder for tomorrow\'s session at 10:00 AM. We\'ll be focusing on your leadership communication skills.',
        direction: 'outbound',
        status: 'sent',
        createdAt: '2024-01-21T00:00:00Z',
        updatedAt: '2024-01-21T00:00:00Z'
      },
      {
        id: 'comm-2',
        clientId: 'client-2',
        coachId: 'coach-1',
        type: 'phone',
        subject: 'Follow-up Call',
        content: 'Discussed progress on career transition and next steps for networking.',
        direction: 'outbound',
        status: 'sent',
        createdAt: '2024-01-18T00:00:00Z',
        updatedAt: '2024-01-18T00:00:00Z'
      }
    ],
    notes: [
      {
        id: 'note-1',
        clientId: 'client-1',
        coachId: 'coach-1',
        sessionId: 'session-1',
        title: 'Leadership Progress Review',
        content: 'John made excellent progress on his leadership skills. He completed the assertiveness training and is ready for the next phase.',
        type: 'session-notes',
        priority: 'high',
        isPrivate: false,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'note-2',
        clientId: 'client-2',
        coachId: 'coach-1',
        sessionId: 'session-2',
        title: 'Career Transition Planning',
        content: 'Sarah is working on her career transition. She has identified her target roles and is developing her networking strategy.',
        type: 'progress-notes',
        priority: 'medium',
        isPrivate: false,
        createdAt: '2024-01-12T00:00:00Z',
        updatedAt: '2024-01-12T00:00:00Z'
      }
    ],
    assessments: [],
    invoices: []
  };
};

// Initialize data on first load
initializeMockData();

class DataService {
  private subscribers: Set<() => void> = new Set();

  // Subscribe to data changes
  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify subscribers of data changes
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }

  // Helper to get current user's role-based data
  private getRoleBasedData<T>(data: T[], filterFn?: (item: T) => boolean): T[] {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];

    let filteredData = data;

    // Apply role-based filtering
    if (currentUser.role === 'client') {
      // Clients can only see their own data
      filteredData = data.filter((item: any) => item.clientId === currentUser.id);
    } else if (currentUser.role === 'coach') {
      // Coaches can see data for their clients
      filteredData = data.filter((item: any) => item.coachId === currentUser.id);
    }
    // Admins can see all data

    // Apply additional filter if provided
    if (filterFn) {
      filteredData = filteredData.filter(filterFn);
    }

    return filteredData;
  }

  // Client Management
  async getClients(filters?: { status?: string; searchTerm?: string }): Promise<{ success: boolean; data: Client[] }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay

      let filteredClients = this.getRoleBasedData(mockData.clients);

      if (filters) {
        if (filters.status) {
          filteredClients = filteredClients.filter(client => client.status === filters.status);
        }
        if (filters.searchTerm) {
          const searchTerm = filters.searchTerm.toLowerCase();
          filteredClients = filteredClients.filter(client => 
            client.name.toLowerCase().includes(searchTerm) ||
            client.email.toLowerCase().includes(searchTerm) ||
            client.phone.includes(searchTerm)
          );
        }
      }

      return {
        success: true,
        data: filteredClients
      };
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  }

  async getClient(clientId: string): Promise<{ success: boolean; data: Client }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      const clients = this.getRoleBasedData(mockData.clients);
      const client = clients.find(c => c.id === clientId);

      if (!client) {
        return {
          success: false,
          data: { id: '', userId: '', name: '', email: '', phone: '', address: { street: '', street2: '', city: '', state: '', zip: '', country: '' }, status: 'inactive', coachId: '', joinDate: '', lastSession: '', nextSession: '', totalRevenue: 0, sessionsCompleted: 0, notes: '', preferences: { communicationMethod: 'email', sessionReminders: false, marketingEmails: false }, createdAt: '', updatedAt: '' }
        };
      }

      return {
        success: true,
        data: client
      };
    } catch (error) {
      return {
        success: false,
        data: { id: '', userId: '', name: '', email: '', phone: '', address: { street: '', street2: '', city: '', state: '', zip: '', country: '' }, status: 'inactive', coachId: '', joinDate: '', lastSession: '', nextSession: '', totalRevenue: 0, sessionsCompleted: 0, notes: '', preferences: { communicationMethod: 'email', sessionReminders: false, marketingEmails: false }, createdAt: '', updatedAt: '' }
      };
    }
  }

  async addClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Client | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newClient: Client = {
        ...clientData,
        id: `client-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockData.clients.push(newClient);
      this.notifySubscribers();

      return {
        success: true,
        data: newClient
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async updateClient(clientId: string, updates: Partial<Client>): Promise<{ success: boolean; data: Client | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const clientIndex = mockData.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.clients[clientIndex] = {
        ...mockData.clients[clientIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.notifySubscribers();

      return {
        success: true,
        data: mockData.clients[clientIndex]
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async deleteClient(clientId: string): Promise<{ success: boolean; data: void | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const clientIndex = mockData.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.clients.splice(clientIndex, 1);
      
      // Also delete related data
      mockData.sessions = mockData.sessions.filter(s => s.clientId !== clientId);
      mockData.goals = mockData.goals.filter(g => g.clientId !== clientId);
      mockData.communications = mockData.communications.filter(c => c.clientId !== clientId);
      mockData.notes = mockData.notes.filter(n => n.clientId !== clientId);
      mockData.assessments = mockData.assessments.filter(a => a.clientId !== clientId);
      mockData.invoices = mockData.invoices.filter(i => i.clientId !== clientId);

      this.notifySubscribers();

      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  // Session Management
  async getSessions(filters?: { status?: string; clientId?: string; type?: string }): Promise<{ success: boolean; data: Session[] }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      let filteredSessions = this.getRoleBasedData(mockData.sessions);

      if (filters) {
        if (filters.status) {
          filteredSessions = filteredSessions.filter(session => session.status === filters.status);
        }
        if (filters.clientId) {
          filteredSessions = filteredSessions.filter(session => session.clientId === filters.clientId);
        }
        if (filters.type) {
          filteredSessions = filteredSessions.filter(session => session.type === filters.type);
        }
      }

      return {
        success: true,
        data: filteredSessions
      };
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  }

  async addSession(sessionData: Omit<Session, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Session | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newSession: Session = {
        ...sessionData,
        id: `session-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockData.sessions.push(newSession);
      this.notifySubscribers();

      return {
        success: true,
        data: newSession
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<{ success: boolean; data: Session | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const sessionIndex = mockData.sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.sessions[sessionIndex] = {
        ...mockData.sessions[sessionIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.notifySubscribers();

      return {
        success: true,
        data: mockData.sessions[sessionIndex]
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async deleteSession(sessionId: string): Promise<{ success: boolean; data: void | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const sessionIndex = mockData.sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.sessions.splice(sessionIndex, 1);
      this.notifySubscribers();

      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  // Goal Management
  async getGoals(clientId?: string): Promise<{ success: boolean; data: Goal[] }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      let filteredGoals = this.getRoleBasedData(mockData.goals);
      
      if (clientId) {
        filteredGoals = filteredGoals.filter(goal => goal.clientId === clientId);
      }

      return {
        success: true,
        data: filteredGoals
      };
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  }

  async addGoal(goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Goal | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newGoal: Goal = {
        ...goalData,
        id: `goal-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockData.goals.push(newGoal);
      this.notifySubscribers();

      return {
        success: true,
        data: newGoal
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async updateGoalProgress(goalId: string, progress: number): Promise<{ success: boolean; data: Goal | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const goalIndex = mockData.goals.findIndex(g => g.id === goalId);
      if (goalIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      const updatedGoal: Goal = {
        ...mockData.goals[goalIndex],
        progress: Math.max(0, Math.min(100, progress)),
        status: progress >= 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started',
        updatedAt: new Date().toISOString()
      };

      mockData.goals[goalIndex] = updatedGoal;
      this.notifySubscribers();

      return {
        success: true,
        data: updatedGoal
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<{ success: boolean; data: Goal | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const goalIndex = mockData.goals.findIndex(g => g.id === goalId);
      if (goalIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.goals[goalIndex] = {
        ...mockData.goals[goalIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.notifySubscribers();

      return {
        success: true,
        data: mockData.goals[goalIndex]
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async deleteGoal(goalId: string): Promise<{ success: boolean; data: void | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const goalIndex = mockData.goals.findIndex(g => g.id === goalId);
      if (goalIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.goals.splice(goalIndex, 1);
      this.notifySubscribers();

      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  // Communication Management
  async getCommunications(clientId?: string): Promise<{ success: boolean; data: Communication[] }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      let filteredCommunications = this.getRoleBasedData(mockData.communications);
      
      if (clientId) {
        filteredCommunications = filteredCommunications.filter(comm => comm.clientId === clientId);
      }

      return {
        success: true,
        data: filteredCommunications
      };
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  }

  async addCommunication(commData: Omit<Communication, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Communication | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newCommunication: Communication = {
        ...commData,
        id: `comm-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockData.communications.push(newCommunication);
      this.notifySubscribers();

      return {
        success: true,
        data: newCommunication
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async updateCommunication(commId: string, updates: Partial<Communication>): Promise<{ success: boolean; data: Communication | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const commIndex = mockData.communications.findIndex(c => c.id === commId);
      if (commIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.communications[commIndex] = {
        ...mockData.communications[commIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.notifySubscribers();

      return {
        success: true,
        data: mockData.communications[commIndex]
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async deleteCommunication(commId: string): Promise<{ success: boolean; data: void | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const commIndex = mockData.communications.findIndex(c => c.id === commId);
      if (commIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.communications.splice(commIndex, 1);
      this.notifySubscribers();

      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  // Note Management
  async getNotes(clientId?: string): Promise<{ success: boolean; data: Note[] }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      let filteredNotes = this.getRoleBasedData(mockData.notes);
      
      if (clientId) {
        filteredNotes = filteredNotes.filter(note => note.clientId === clientId);
      }

      // Filter out private notes for clients
      const currentUser = authService.getCurrentUser();
      if (currentUser?.role === 'client') {
        filteredNotes = filteredNotes.filter(note => !note.isPrivate);
      }

      return {
        success: true,
        data: filteredNotes
      };
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  }

  async addNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Note | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newNote: Note = {
        ...noteData,
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockData.notes.push(newNote);
      this.notifySubscribers();

      return {
        success: true,
        data: newNote
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async updateNote(noteId: string, updates: Partial<Note>): Promise<{ success: boolean; data: Note | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const noteIndex = mockData.notes.findIndex(n => n.id === noteId);
      if (noteIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.notes[noteIndex] = {
        ...mockData.notes[noteIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.notifySubscribers();

      return {
        success: true,
        data: mockData.notes[noteIndex]
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  async deleteNote(noteId: string): Promise<{ success: boolean; data: void | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const noteIndex = mockData.notes.findIndex(n => n.id === noteId);
      if (noteIndex === -1) {
        return {
          success: false,
          data: null
        };
      }

      mockData.notes.splice(noteIndex, 1);
      this.notifySubscribers();

      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<{ success: boolean; data: {
    totalClients: number;
    activeClients: number;
    newClientsThisMonth: number;
    totalSessions: number;
    upcomingSessions: number;
    completedSessionsThisMonth: number;
    totalRevenue: number;
    revenueThisMonth: number;
    averageSessionPrice: number;
    clientSatisfactionScore: number;
    goalCompletionRate: number;
  } | null }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          data: null
        };
      }

      let filteredClients = this.getRoleBasedData(mockData.clients);
      let filteredSessions = this.getRoleBasedData(mockData.sessions);

      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const stats = {
        totalClients: filteredClients.length,
        activeClients: filteredClients.filter(c => c.status === 'active').length,
        newClientsThisMonth: filteredClients.filter(c => new Date(c.joinDate) >= thisMonth).length,
        totalSessions: filteredSessions.length,
        upcomingSessions: filteredSessions.filter(s => 
          s.status === 'scheduled' && new Date(s.date) <= nextWeek
        ).length,
        completedSessionsThisMonth: filteredSessions.filter(s => 
          s.status === 'completed' && new Date(s.date) >= thisMonth
        ).length,
        totalRevenue: filteredClients.reduce((sum, client) => sum + client.totalRevenue, 0),
        revenueThisMonth: filteredSessions
          .filter(s => s.status === 'completed' && new Date(s.date) >= thisMonth)
          .reduce((sum, session) => sum + session.price, 0),
        averageSessionPrice: filteredSessions.length > 0 
          ? filteredSessions.reduce((sum, session) => sum + session.price, 0) / filteredSessions.length 
          : 0,
        clientSatisfactionScore: 4.5, // Mock value
        goalCompletionRate: mockData.goals.length > 0 
          ? (mockData.goals.filter(g => g.status === 'completed').length / mockData.goals.length) * 100 
          : 0
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        data: {
          totalClients: 0,
          activeClients: 0,
          newClientsThisMonth: 0,
          totalSessions: 0,
          upcomingSessions: 0,
          completedSessionsThisMonth: 0,
          totalRevenue: 0,
          revenueThisMonth: 0,
          averageSessionPrice: 0,
          clientSatisfactionScore: 0,
          goalCompletionRate: 0
        }
      };
    }
  }

  // Export data
  async exportData(type: 'clients' | 'sessions' | 'goals' | 'communications' | 'notes'): Promise<{ success: boolean; data: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      let data: any[] = [];
      
      switch (type) {
        case 'clients':
          data = this.getRoleBasedData(mockData.clients);
          break;
        case 'sessions':
          data = this.getRoleBasedData(mockData.sessions);
          break;
        case 'goals':
          data = this.getRoleBasedData(mockData.goals);
          break;
        case 'communications':
          data = this.getRoleBasedData(mockData.communications);
          break;
        case 'notes':
          data = this.getRoleBasedData(mockData.notes);
          break;
      }

      const csv = this.convertToCSV(data);
      
      return {
        success: true,
        data: csv
      };
    } catch (error) {
      return {
        success: false,
        data: ''
      };
    }
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }
}

// Export singleton instance
export const dataService = new DataService(); 
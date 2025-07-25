// CoachCare Data Types and Interfaces
import { RegisterData } from './auth';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coach' | 'client';
  profilePicture?: string;
  bio?: string;
  phone?: string;
  company?: string;
  title?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Client {
  id: string;
  userId: string; // Reference to User table
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  profilePicture?: string;
  status: 'active' | 'inactive' | 'lead' | 'prospect';
  coachId: string; // Reference to coach User
  joinDate: string;
  lastSession?: string;
  nextSession?: string;
  totalRevenue: number;
  sessionsCompleted: number;
  notes?: string;
  preferences?: {
    communicationMethod: 'email' | 'phone' | 'text';
    sessionReminders: boolean;
    marketingEmails: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  clientId: string;
  coachId: string;
  title: string;
  type: 'initial' | 'follow-up' | 'assessment' | 'goal-setting' | 'progress-review' | 'wrap-up';
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';
  price: number;
  location: 'in-person' | 'video' | 'phone';
  meetingLink?: string;
  notes?: string;
  goals?: string[];
  actionItems?: string[];
  clientFeedback?: {
    rating: number;
    comments?: string;
  };
  coachNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: 'career' | 'personal' | 'health' | 'financial' | 'relationship' | 'skill-development';
  targetDate: string;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'paused' | 'cancelled';
  milestones?: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Communication {
  id: string;
  clientId: string;
  coachId: string;
  type: 'email' | 'phone' | 'text' | 'video' | 'in-person';
  subject: string;
  content: string;
  direction: 'inbound' | 'outbound';
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'scheduled';
  scheduledDate?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  clientId: string;
  coachId: string;
  sessionId?: string;
  title: string;
  content: string;
  type: 'session-notes' | 'progress-notes' | 'general' | 'assessment' | 'action-items';
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  isPrivate: boolean; // If true, client can't see this note
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  clientId: string;
  coachId: string;
  type: 'personality' | 'skills' | 'values' | 'goals' | 'custom';
  title: string;
  questions: {
    id: string;
    question: string;
    type: 'multiple-choice' | 'scale' | 'text' | 'boolean';
    options?: string[];
    required: boolean;
  }[];
  responses?: {
    questionId: string;
    answer: string | number | boolean;
  }[];
  status: 'draft' | 'sent' | 'completed' | 'expired';
  sentDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  coachId: string;
  sessionId?: string;
  number: string;
  amount: number;
  tax?: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoachCareState {
  // Authentication
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Data
  clients: Client[];
  sessions: Session[];
  goals: Goal[];
  communications: Communication[];
  notes: Note[];
  assessments: Assessment[];
  invoices: Invoice[];
  
  // UI State
  activeTab: string;
  selectedClient: Client | null;
  selectedSession: Session | null;
  searchTerm: string;
  filterStatus: string;
  viewMode: 'grid' | 'list';
  
  // Modals
  showAddClient: boolean;
  showEditClient: boolean;
  showAddSession: boolean;
  showEditSession: boolean;
  showAddGoal: boolean;
  showEditGoal: boolean;
  showAddNote: boolean;
  showEditNote: boolean;
  showAddCommunication: boolean;
  showEditCommunication: boolean;
  
  // Editing
  editingClient: Client | null;
  editingSession: Session | null;
  editingGoal: Goal | null;
  editingNote: Note | null;
  editingCommunication: Communication | null;
}

export interface CoachCareActions {
  // Authentication
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  
  // Client Management
  addClient: (clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateClient: (clientId: string, clientData: Partial<Client>) => Promise<void>;
  deleteClient: (clientId: string) => Promise<void>;
  getClient: (clientId: string) => Client | undefined;
  
  // Session Management
  addSession: (sessionData: Omit<Session, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSession: (sessionId: string, sessionData: Partial<Session>) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  getSession: (sessionId: string) => Session | undefined;
  
  // Goal Management
  addGoal: (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGoal: (goalId: string, goalData: Partial<Goal>) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  updateGoalProgress: (goalId: string, progress: number) => Promise<void>;
  
  // Communication Management
  addCommunication: (commData: Omit<Communication, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCommunication: (commId: string, commData: Partial<Communication>) => Promise<void>;
  deleteCommunication: (commId: string) => Promise<void>;
  
  // Note Management
  addNote: (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (noteId: string, noteData: Partial<Note>) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  
  // Assessment Management
  addAssessment: (assessmentData: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAssessment: (assessmentId: string, assessmentData: Partial<Assessment>) => Promise<void>;
  deleteAssessment: (assessmentId: string) => Promise<void>;
  submitAssessment: (assessmentId: string, responses: Assessment['responses']) => Promise<void>;
  
  // Invoice Management
  addInvoice: (invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateInvoice: (invoiceId: string, invoiceData: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (invoiceId: string) => Promise<void>;
  markInvoicePaid: (invoiceId: string) => Promise<void>;
  
  // UI Actions
  setActiveTab: (tab: string) => void;
  setSelectedClient: (client: Client | null) => void;
  setSelectedSession: (session: Session | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Modal Actions
  showModal: (modalName: string) => void;
  hideModal: (modalName: string) => void;
  setEditingItem: (itemType: string, item: any) => void;
  clearEditingItem: (itemType: string) => void;
}

export interface CoachCareContextType {
  state: CoachCareState;
  actions: CoachCareActions;
}

// Utility Types
export type ClientStatus = Client['status'];
export type SessionStatus = Session['status'];
export type GoalStatus = Goal['status'];
export type CommunicationType = Communication['type'];
export type NoteType = Note['type'];
export type UserRole = User['role'];

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and Search Types
export interface ClientFilters {
  status?: ClientStatus;
  coachId?: string;
  searchTerm?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SessionFilters {
  status?: SessionStatus;
  clientId?: string;
  coachId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  type?: Session['type'];
}

// Dashboard Stats
export interface DashboardStats {
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
} 
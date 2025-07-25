import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { 
  CoachCareState, 
  CoachCareActions, 
  CoachCareContextType,
  User,
  Client,
  Session,
  Goal,
  Communication,
  Note,
  Assessment,
  Invoice,
  /* ClientFilters, */
  /* SessionFilters */
} from './types';
import { authService, RegisterData } from './auth';
import { dataService } from './dataService';

// Initial state
const initialState: CoachCareState = {
  // Authentication
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  
  // Data
  clients: [],
  sessions: [],
  goals: [],
  communications: [],
  notes: [],
  assessments: [],
  invoices: [],
  
  // UI State
  activeTab: 'dashboard',
  selectedClient: null,
  selectedSession: null,
  searchTerm: '',
  filterStatus: 'all',
  viewMode: 'grid',
  
  // Modals
  showAddClient: false,
  showEditClient: false,
  showAddSession: false,
  showEditSession: false,
  showAddGoal: false,
  showEditGoal: false,
  showAddNote: false,
  showEditNote: false,
  showAddCommunication: false,
  showEditCommunication: false,
  
  // Editing
  editingClient: null,
  editingSession: null,
  editingGoal: null,
  editingNote: null,
  editingCommunication: null,
};

// Action types
type CoachCareAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: { user: User; isAuthenticated: boolean } }
  | { type: 'LOGOUT' }
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'SET_SESSIONS'; payload: Session[] }
  | { type: 'SET_GOALS'; payload: Goal[] }
  | { type: 'SET_COMMUNICATIONS'; payload: Communication[] }
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'SET_ASSESSMENTS'; payload: Assessment[] }
  | { type: 'SET_INVOICES'; payload: Invoice[] }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_SELECTED_CLIENT'; payload: Client | null }
  | { type: 'SET_SELECTED_SESSION'; payload: Session | null }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTER_STATUS'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' }
  | { type: 'SHOW_MODAL'; payload: string }
  | { type: 'HIDE_MODAL'; payload: string }
  | { type: 'SET_EDITING_ITEM'; payload: { type: string; item: any } }
  | { type: 'CLEAR_EDITING_ITEM'; payload: string }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'ADD_SESSION'; payload: Session }
  | { type: 'UPDATE_SESSION'; payload: Session }
  | { type: 'DELETE_SESSION'; payload: string }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: Goal }
  | { type: 'DELETE_GOAL'; payload: string }
  | { type: 'ADD_COMMUNICATION'; payload: Communication }
  | { type: 'UPDATE_COMMUNICATION'; payload: Communication }
  | { type: 'DELETE_COMMUNICATION'; payload: string }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string };

// Reducer
const coachCareReducer = (state: CoachCareState, action: CoachCareAction): CoachCareState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_AUTHENTICATED':
      return { 
        ...state, 
        currentUser: action.payload.user, 
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false 
      };
    
    case 'LOGOUT':
      return { 
        ...initialState, 
        isLoading: false 
      };
    
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };
    
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    
    case 'SET_GOALS':
      return { ...state, goals: action.payload };
    
    case 'SET_COMMUNICATIONS':
      return { ...state, communications: action.payload };
    
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    
    case 'SET_ASSESSMENTS':
      return { ...state, assessments: action.payload };
    
    case 'SET_INVOICES':
      return { ...state, invoices: action.payload };
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'SET_SELECTED_CLIENT':
      return { ...state, selectedClient: action.payload };
    
    case 'SET_SELECTED_SESSION':
      return { ...state, selectedSession: action.payload };
    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'SHOW_MODAL':
      return { ...state, [`show${action.payload.charAt(0).toUpperCase() + action.payload.slice(1)}`]: true };
    
    case 'HIDE_MODAL':
      return { ...state, [`show${action.payload.charAt(0).toUpperCase() + action.payload.slice(1)}`]: false };
    
    case 'SET_EDITING_ITEM':
      return { ...state, [`editing${action.payload.type.charAt(0).toUpperCase() + action.payload.type.slice(1)}`]: action.payload.item };
    
    case 'CLEAR_EDITING_ITEM':
      return { ...state, [`editing${action.payload.charAt(0).toUpperCase() + action.payload.slice(1)}`]: null };
    
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };
    
    case 'UPDATE_CLIENT':
      return { 
        ...state, 
        clients: state.clients.map(client => 
          client.id === action.payload.id ? action.payload : client
        ),
        selectedClient: state.selectedClient?.id === action.payload.id ? action.payload : state.selectedClient
      };
    
    case 'DELETE_CLIENT':
      return { 
        ...state, 
        clients: state.clients.filter(client => client.id !== action.payload),
        selectedClient: state.selectedClient?.id === action.payload ? null : state.selectedClient
      };
    
    case 'ADD_SESSION':
      return { ...state, sessions: [...state.sessions, action.payload] };
    
    case 'UPDATE_SESSION':
      return { 
        ...state, 
        sessions: state.sessions.map(session => 
          session.id === action.payload.id ? action.payload : session
        ),
        selectedSession: state.selectedSession?.id === action.payload.id ? action.payload : state.selectedSession
      };
    
    case 'DELETE_SESSION':
      return { 
        ...state, 
        sessions: state.sessions.filter(session => session.id !== action.payload),
        selectedSession: state.selectedSession?.id === action.payload ? null : state.selectedSession
      };
    
    case 'ADD_GOAL':
      return { ...state, goals: [...state.goals, action.payload] };
    
    case 'UPDATE_GOAL':
      return { 
        ...state, 
        goals: state.goals.map(goal => 
          goal.id === action.payload.id ? action.payload : goal
        )
      };
    
    case 'DELETE_GOAL':
      return { 
        ...state, 
        goals: state.goals.filter(goal => goal.id !== action.payload)
      };
    
    case 'ADD_COMMUNICATION':
      return { ...state, communications: [...state.communications, action.payload] };
    
    case 'UPDATE_COMMUNICATION':
      return { 
        ...state, 
        communications: state.communications.map(comm => 
          comm.id === action.payload.id ? action.payload : comm
        )
      };
    
    case 'DELETE_COMMUNICATION':
      return { 
        ...state, 
        communications: state.communications.filter(comm => comm.id !== action.payload)
      };
    
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    
    case 'UPDATE_NOTE':
      return { 
        ...state, 
        notes: state.notes.map(note => 
          note.id === action.payload.id ? action.payload : note
        )
      };
    
    case 'DELETE_NOTE':
      return { 
        ...state, 
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// Create context
const CoachCareContext = createContext<CoachCareContextType | undefined>(undefined);

// Provider component
export const CoachCareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(coachCareReducer, initialState);

  // Initialize authentication and data on mount
  useEffect(() => {
    const initializeApp = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if user is already authenticated
      const currentUser = authService.getCurrentUser();
      if (currentUser && authService.isAuthenticated()) {
        dispatch({ 
          type: 'SET_AUTHENTICATED', 
          payload: { user: currentUser, isAuthenticated: true } 
        });
        
        // Load initial data
        await loadInitialData();
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeApp();
  }, []);

  // Subscribe to data changes
  useEffect(() => {
    const unsubscribe = dataService.subscribe(() => {
      // Reload data when changes occur
      loadInitialData();
    });

    return unsubscribe;
  }, []);

  const loadInitialData = async () => {
    try {
      const [clientsRes, sessionsRes, goalsRes, communicationsRes, notesRes] = await Promise.all([
        dataService.getClients(),
        dataService.getSessions(),
        dataService.getGoals(),
        dataService.getCommunications(),
        dataService.getNotes()
      ]);

      if (clientsRes.success) dispatch({ type: 'SET_CLIENTS', payload: clientsRes.data! });
      if (sessionsRes.success) dispatch({ type: 'SET_SESSIONS', payload: sessionsRes.data! });
      if (goalsRes.success) dispatch({ type: 'SET_GOALS', payload: goalsRes.data! });
      if (communicationsRes.success) dispatch({ type: 'SET_COMMUNICATIONS', payload: communicationsRes.data! });
      if (notesRes.success) dispatch({ type: 'SET_NOTES', payload: notesRes.data! });
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  // Actions
  const actions: CoachCareActions = {
    // Authentication
    login: async (email: string, password: string) => {
      const response = await authService.login(email, password);
      if (response.success && response.user) {
        dispatch({ 
          type: 'SET_AUTHENTICATED', 
          payload: { user: response.user, isAuthenticated: true } 
        });
        await loadInitialData();
        return true;
      }
      return false;
    },

    logout: () => {
      authService.logout();
      dispatch({ type: 'LOGOUT' });
    },

    register: async (userData: RegisterData) => {
      const response = await authService.register(userData);
      if (response.success && response.user) {
        dispatch({ 
          type: 'SET_AUTHENTICATED', 
          payload: { user: response.user, isAuthenticated: true } 
        });
        await loadInitialData();
        return true;
      }
      return false;
    },

    // Client Management
    addClient: async (clientData) => {
      const response = await dataService.addClient(clientData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_CLIENT', payload: response.data });
      }
    },

    updateClient: async (clientId, clientData) => {
      const response = await dataService.updateClient(clientId, clientData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_CLIENT', payload: response.data });
      }
    },

    deleteClient: async (clientId) => {
      const response = await dataService.deleteClient(clientId);
      if (response.success) {
        dispatch({ type: 'DELETE_CLIENT', payload: clientId });
      }
    },

    getClient: (clientId) => {
      return state.clients.find(client => client.id === clientId);
    },

    // Session Management
    addSession: async (sessionData) => {
      const response = await dataService.addSession(sessionData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_SESSION', payload: response.data });
      }
    },

    updateSession: async (sessionId, sessionData) => {
      const response = await dataService.updateSession(sessionId, sessionData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_SESSION', payload: response.data });
      }
    },

    deleteSession: async (sessionId) => {
      const response = await dataService.deleteSession(sessionId);
      if (response.success) {
        dispatch({ type: 'DELETE_SESSION', payload: sessionId });
      }
    },

    getSession: (sessionId) => {
      return state.sessions.find(session => session.id === sessionId);
    },

    // Goal Management
    addGoal: async (goalData) => {
      const response = await dataService.addGoal(goalData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_GOAL', payload: response.data });
      }
    },

    updateGoal: async (goalId, goalData) => {
      const response = await dataService.updateGoal(goalId, goalData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_GOAL', payload: response.data });
      }
    },

    deleteGoal: async (goalId) => {
      const response = await dataService.deleteGoal(goalId);
      if (response.success) {
        dispatch({ type: 'DELETE_GOAL', payload: goalId });
      }
    },

    updateGoalProgress: async (goalId, progress) => {
      const response = await dataService.updateGoalProgress(goalId, progress);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_GOAL', payload: response.data });
      }
    },

    // Communication Management
    addCommunication: async (commData) => {
      const response = await dataService.addCommunication(commData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_COMMUNICATION', payload: response.data });
      }
    },

    updateCommunication: async (commId, commData) => {
      const response = await dataService.updateCommunication(commId, commData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_COMMUNICATION', payload: response.data });
      }
    },

    deleteCommunication: async (commId) => {
      const response = await dataService.deleteCommunication(commId);
      if (response.success) {
        dispatch({ type: 'DELETE_COMMUNICATION', payload: commId });
      }
    },

    // Note Management
    addNote: async (noteData) => {
      const response = await dataService.addNote(noteData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_NOTE', payload: response.data });
      }
    },

    updateNote: async (noteId, noteData) => {
      const response = await dataService.updateNote(noteId, noteData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_NOTE', payload: response.data });
      }
    },

    deleteNote: async (noteId) => {
      const response = await dataService.deleteNote(noteId);
      if (response.success) {
        dispatch({ type: 'DELETE_NOTE', payload: noteId });
      }
    },

    // Assessment Management (placeholder implementations)
    addAssessment: async () => {},
    updateAssessment: async () => {},
    deleteAssessment: async () => {},
    submitAssessment: async () => {},

    // Invoice Management (placeholder implementations)
    addInvoice: async () => {},
    updateInvoice: async () => {},
    deleteInvoice: async () => {},
    markInvoicePaid: async () => {},

    // UI Actions
    setActiveTab: (tab) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
    setSelectedClient: (client) => dispatch({ type: 'SET_SELECTED_CLIENT', payload: client }),
    setSelectedSession: (session) => dispatch({ type: 'SET_SELECTED_SESSION', payload: session }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setFilterStatus: (status) => dispatch({ type: 'SET_FILTER_STATUS', payload: status }),
    setViewMode: (mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),

    // Modal Actions
    showModal: (modalName) => dispatch({ type: 'SHOW_MODAL', payload: modalName }),
    hideModal: (modalName) => dispatch({ type: 'HIDE_MODAL', payload: modalName }),
    setEditingItem: (itemType, item) => dispatch({ type: 'SET_EDITING_ITEM', payload: { type: itemType, item } }),
    clearEditingItem: (itemType) => dispatch({ type: 'CLEAR_EDITING_ITEM', payload: itemType }),
  };

  const contextValue: CoachCareContextType = {
    state,
    actions
  };

  return (
    <CoachCareContext.Provider value={contextValue}>
      {children}
    </CoachCareContext.Provider>
  );
};

// Custom hook to use the context
export const useCoachCare = (): CoachCareContextType => {
  const context = useContext(CoachCareContext);
  if (context === undefined) {
    throw new Error('useCoachCare must be used within a CoachCareProvider');
  }
  return context;
};

// Helper hooks for specific functionality
export const useAuth = () => {
  const { state, actions } = useCoachCare();
  return {
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login: actions.login,
    logout: actions.logout,
    register: actions.register,
  };
};

export const useClients = () => {
  const { state, actions } = useCoachCare();
  return {
    clients: state.clients,
    selectedClient: state.selectedClient,
    addClient: actions.addClient,
    updateClient: actions.updateClient,
    deleteClient: actions.deleteClient,
    getClient: actions.getClient,
    setSelectedClient: actions.setSelectedClient,
  };
};

export const useSessions = () => {
  const { state, actions } = useCoachCare();
  return {
    sessions: state.sessions,
    selectedSession: state.selectedSession,
    addSession: actions.addSession,
    updateSession: actions.updateSession,
    deleteSession: actions.deleteSession,
    getSession: actions.getSession,
    setSelectedSession: actions.setSelectedSession,
  };
};

export const useGoals = () => {
  const { state, actions } = useCoachCare();
  return {
    goals: state.goals,
    addGoal: actions.addGoal,
    updateGoal: actions.updateGoal,
    deleteGoal: actions.deleteGoal,
    updateGoalProgress: actions.updateGoalProgress,
  };
};

export const useCommunications = () => {
  const { state, actions } = useCoachCare();
  return {
    communications: state.communications,
    addCommunication: actions.addCommunication,
    updateCommunication: actions.updateCommunication,
    deleteCommunication: actions.deleteCommunication,
  };
};

export const useNotes = () => {
  const { state, actions } = useCoachCare();
  return {
    notes: state.notes,
    addNote: actions.addNote,
    updateNote: actions.updateNote,
    deleteNote: actions.deleteNote,
  };
}; 
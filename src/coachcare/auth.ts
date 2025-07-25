import { User, UserRole } from './types';

// Mock user database - in production, this would be a real database
const mockUsers: User[] = [
  {
    id: 'owner-1',
    email: 'NoWindowShoppingOnline@gmail.com',
    name: 'Brian Proctor',
    role: 'admin',
    profilePicture: '/assets/founder.png',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
    bio: 'Founder of No Window Shopping Professional Services. Business leader, training expert, and executive coach dedicated to empowering individuals and organizations.',
    phone: '(410) 871-8392',
    company: 'No Window Shopping Professional Services',
    title: 'Founder & CEO',
  },
  {
    id: 'coach-1',
    email: 'brian@coachcare.com',
    name: 'Brian Proctor',
    role: 'coach',
    profilePicture: '/assets/founder.png',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
    bio: 'Executive coach and business consultant specializing in leadership development, professional growth, and organizational transformation.',
    phone: '(410) 871-8392',
    company: 'No Window Shopping Professional Services',
    title: 'Executive Coach',
  },
  {
    id: 'admin-1',
    email: 'admin@coachcare.com',
    name: 'System Administrator',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
  },
  {
    id: 'client-1',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'client',
    createdAt: '2024-01-15T00:00:00Z',
    isActive: true,
  },
  {
    id: 'client-2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    role: 'client',
    createdAt: '2024-01-20T00:00:00Z',
    isActive: true,
  },
];

// Mock passwords - in production, these would be hashed
const mockPasswords: Record<string, string> = {
  'NoWindowShoppingOnline@gmail.com': 'NWS2024!',
  'brian@coachcare.com': 'coach123',
  'admin@coachcare.com': 'admin123',
  'john@example.com': 'client123',
  'sarah@example.com': 'client123',
};

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  token?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  constructor() {
    // Check for existing session
    this.loadSession();
  }

  private loadSession(): void {
    const savedUser = localStorage.getItem('coachcare_user');
    const savedToken = localStorage.getItem('coachcare_token');
    
    if (savedUser && savedToken) {
      try {
        this.currentUser = JSON.parse(savedUser);
        this.token = savedToken;
      } catch (error) {
        this.clearSession();
      }
    }
  }

  private saveSession(user: User, token: string): void {
    localStorage.setItem('coachcare_user', JSON.stringify(user));
    localStorage.setItem('coachcare_token', token);
  }

  private clearSession(): void {
    localStorage.removeItem('coachcare_user');
    localStorage.removeItem('coachcare_token');
    this.currentUser = null;
    this.token = null;
  }

  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = mockUsers.find(u => u.email === email);
      const storedPassword = mockPasswords[email];

      if (!user || !storedPassword || storedPassword !== password) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      if (!user.isActive) {
        return {
          success: false,
          error: 'Account is deactivated'
        };
      }

      // Update last login
      user.lastLogin = new Date().toISOString();

      // Generate token
      const token = this.generateToken();

      // Save session
      this.currentUser = user;
      this.token = token;
      this.saveSession(user, token);

      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        };
      }

      // Create new user
      const newUser: User = {
        id: `${data.role}-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      // Add to mock database
      mockUsers.push(newUser);
      mockPasswords[data.email] = data.password;

      // Generate token
      const token = this.generateToken();

      // Save session
      this.currentUser = newUser;
      this.token = token;
      this.saveSession(newUser, token);

      return {
        success: true,
        user: newUser,
        token
      };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  }

  logout(): void {
    this.clearSession();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return this.currentUser ? roles.includes(this.currentUser.role) : false;
  }

  getToken(): string | null {
    return this.token;
  }

  // Password reset functionality
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        return {
          success: false,
          message: 'If an account with this email exists, a password reset link has been sent.'
        };
      }

      // In production, this would send an actual email
      console.log(`Password reset requested for ${email}`);

      return {
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to process password reset request.'
      };
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, this would validate the reset token
      console.log(`Password reset with token: ${token}`);

      return {
        success: true,
        message: 'Password has been reset successfully.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to reset password.'
      };
    }
  }

  // Change password for authenticated user
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          message: 'User not authenticated.'
        };
      }

      const storedPassword = mockPasswords[this.currentUser.email];
      if (storedPassword !== currentPassword) {
        return {
          success: false,
          message: 'Current password is incorrect.'
        };
      }

      // Update password
      mockPasswords[this.currentUser.email] = newPassword;

      return {
        success: true,
        message: 'Password changed successfully.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to change password.'
      };
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      if (!this.currentUser) {
        return {
          success: false,
          message: 'User not authenticated.'
        };
      }

      // Update user in mock database
      const userIndex = mockUsers.findIndex(u => u.id === this.currentUser!.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
        this.currentUser = mockUsers[userIndex];
        this.saveSession(this.currentUser, this.token!);
      }

      return {
        success: true,
        user: this.currentUser,
        message: 'Profile updated successfully.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile.'
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export helper functions
export const isAdmin = (): boolean => authService.hasRole('admin');
export const isCoach = (): boolean => authService.hasRole('coach');
export const isClient = (): boolean => authService.hasRole('client');
export const isAuthenticated = (): boolean => authService.isAuthenticated();
export const getCurrentUser = (): User | null => authService.getCurrentUser(); 
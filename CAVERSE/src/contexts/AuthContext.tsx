import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'admin';
  phone?: string;
  course?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    course: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: any) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for localStorage
const getToken = (): string | null => localStorage.getItem('authToken');
const setToken = (token: string) => localStorage.setItem('authToken', token);
const clearToken = () => localStorage.removeItem('authToken');

const getStoredUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
const setStoredUser = (user: User) => localStorage.setItem('user', JSON.stringify(user));
const clearStoredUser = () => localStorage.removeItem('user');

/**
 * Mock Auth Provider - works without backend
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const token = getToken();
        const storedUser = getStoredUser();

        if (token && storedUser) {
          setUser(storedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      let mockUser: User;
      if (email === 'admin@eduspace.com' && password === 'Admin@123') {
        mockUser = {
          id: 'admin-001',
          email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
        };
      } else {
        mockUser = {
          id: `student-${Date.now()}`,
          email,
          firstName: email.split('@')[0],
          lastName: 'Student',
          role: 'student',
          phone: '+1234567890',
          course: 'General Studies',
        };
      }

      const mockToken = `mock-token-${Date.now()}`;
      setToken(mockToken);
      setStoredUser(mockUser);
      setUser(mockUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      setUser(null);
      throw err;
    }
  }, []);

  const register = useCallback(async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    course: string;
  }) => {
    try {
      setError(null);
      
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const mockUser: User = {
        id: `student-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'student',
        phone: userData.phone,
        course: userData.course,
      };

      const mockToken = `mock-token-${Date.now()}`;
      setToken(mockToken);
      setStoredUser(mockUser);
      setUser(mockUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      setUser(null);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      clearToken();
      clearStoredUser();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  const updateProfile = useCallback(async (userData: any) => {
    try {
      setError(null);
      
      if (!user) {
        throw new Error('No user logged in');
      }

      const updatedUser = { ...user, ...userData };
      setStoredUser(updatedUser);
      setUser(updatedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Update failed';
      setError(message);
      throw err;
    }
  }, [user]);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        setError(null);
        
        if (!currentPassword || !newPassword) {
          throw new Error('Both passwords are required');
        }

        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Password change failed';
        setError(message);
        throw err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

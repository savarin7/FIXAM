import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'customer' | 'artisan' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  'customer@fixam.com': { _id: '1', name: 'John Customer', email: 'customer@fixam.com', password: 'password', role: 'customer', location: 'Lagos, Nigeria' },
  'artisan@fixam.com': { _id: '2', name: 'Sarah Artisan', email: 'artisan@fixam.com', password: 'password', role: 'artisan', location: 'Lagos, Nigeria', bio: 'Expert plumber with 10+ years experience' },
  'admin@fixam.com': { _id: '3', name: 'Admin User', email: 'admin@fixam.com', password: 'password', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('fixam_token');
    const savedUser = localStorage.getItem('fixam_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with real API call
    const mockUser = MOCK_USERS[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userData } = mockUser;
    const mockToken = 'mock_jwt_' + btoa(JSON.stringify(userData));
    setUser(userData);
    setToken(mockToken);
    localStorage.setItem('fixam_token', mockToken);
    localStorage.setItem('fixam_user', JSON.stringify(userData));
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    const newUser: User = { _id: Date.now().toString(), name, email, role };
    const mockToken = 'mock_jwt_' + btoa(JSON.stringify(newUser));
    setUser(newUser);
    setToken(mockToken);
    localStorage.setItem('fixam_token', mockToken);
    localStorage.setItem('fixam_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fixam_token');
    localStorage.removeItem('fixam_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

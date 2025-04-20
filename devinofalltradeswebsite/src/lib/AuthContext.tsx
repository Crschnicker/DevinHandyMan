"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define the user type
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

// Define the appointment type
export type Appointment = {
  id: string;
  service: string;
  serviceOption: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "canceled" | "change-requested";
  address: string;
  totalPrice: number;
  createdAt: string;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  userAppointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => Promise<boolean>;
  requestAppointmentChange: (appointmentId: string) => Promise<boolean>;
};

// Create the default context value
const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  userAppointments: [],
  addAppointment: async () => false,
  requestAppointmentChange: async () => false
};

// Create the auth context
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "555-123-4567"
  }
];

// Mock appointments data for demonstration
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt1",
    service: "Painting",
    serviceOption: "Medium Room (151-250 sq ft)",
    date: "2025-04-25",
    time: "10:00 AM",
    status: "upcoming",
    address: "123 Main St, Bradenton, FL",
    totalPrice: 175.50,
    createdAt: "2025-04-18T10:30:00Z"
  },
  {
    id: "apt2",
    service: "Electrical",
    serviceOption: "Install Ceiling Fan",
    date: "2025-03-15",
    time: "1:00 PM",
    status: "completed",
    address: "123 Main St, Bradenton, FL",
    totalPrice: 97.50,
    createdAt: "2025-03-10T14:15:00Z"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be a call to your authentication API
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      if (typeof window !== 'undefined') {
        localStorage.setItem('devinUser', JSON.stringify(userWithoutPassword));
      }
      setUserAppointments(MOCK_APPOINTMENTS);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd validate and send this to your API
    const newUser = {
      id: `user${Date.now()}`,
      name,
      email,
      password, // Would be hashed in a real app
      phone
    };
    
    // Simulate successful registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    if (typeof window !== 'undefined') {
      localStorage.setItem('devinUser', JSON.stringify(userWithoutPassword));
    }
    setUserAppointments([]);
    setIsLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setUserAppointments([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('devinUser');
    }
  };

  // Add appointment function
  const addAppointment = async (
    appointmentData: Omit<Appointment, "id" | "createdAt">
  ): Promise<boolean> => {
    if (!user) return false;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `apt${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setUserAppointments(prev => [newAppointment, ...prev]);
    return true;
  };

  // Request appointment change function
  const requestAppointmentChange = async (appointmentId: string): Promise<boolean> => {
    if (!user) return false;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUserAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "change-requested" as const } 
          : apt
      )
    );
    
    return true;
  };

  // Check for stored user on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('devinUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Get appointments for this user
          setUserAppointments(MOCK_APPOINTMENTS);
        } catch (error) {
          console.error("Failed to parse stored user", error);
          localStorage.removeItem('devinUser');
        }
      }
    }
    setIsLoading(false);
  }, []);

  // For server-side rendering, return a fallback
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        userAppointments,
        addAppointment,
        requestAppointmentChange
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  // Return the context
  return useContext(AuthContext);
};
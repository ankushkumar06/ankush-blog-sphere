
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

// Define types for our context
type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Mock function to simulate API calls
// Note: In a real app, this would connect to your backend
const mockAuthAPI = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This is a mock - in a real app you'd validate with your backend
    if (email === "demo@example.com" && password === "password") {
      return {
        id: "1",
        email: "demo@example.com",
        name: "Demo User"
      };
    }
    
    // For demo purposes, let's automatically log in any user
    return {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name: email.split('@')[0]
    };
  },
  
  register: async (email: string, password: string, name: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock user
    return {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name
    };
  }
};

// Provider component that wraps the app and makes auth object available
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await mockAuthAPI.login(email, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const user = await mockAuthAPI.register(email, password, name);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

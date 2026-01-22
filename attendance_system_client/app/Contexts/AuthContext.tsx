"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from "@/app/ApiClient/authentication/login";
import { initiateGoogleOAuthPopup } from "@/app/ApiClient/authentication/oauth";
import { hasTokens, migrateTokensToMemory, getRefreshToken } from "@/app/Utils/tokenStorage";

interface User {
  uuid: string;
  firstName: string;
  role: "admin" | "teacher" | "student" | "staff";
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (userData: {
    firstName: string;
    role?: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      // Check if we have refresh token (access token is lost on refresh, that's OK)
      // If refresh token exists, we can get a new access token automatically
      const hasRefreshToken = getRefreshToken();
      
      if (!hasRefreshToken) {
        // No refresh token means user needs to login
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Try to get current user - this will automatically refresh access token if needed
      const response = await getCurrentUser();
      if (response.success && response.user) {
        setUser({
          uuid: response.user.uuid,
          firstName: response.user.firstName,
          role: response.user.role as "admin" | "teacher" | "student" | "staff",
          email: response.user.email
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      // If getCurrentUser fails (e.g., refresh token expired), clear user
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only run on client side to avoid hydration issues
    if (typeof window !== 'undefined') {
      // Migrate any old tokens from localStorage to memory (one-time migration)
      migrateTokensToMemory();
      checkAuth();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      if (response.success && response.user) {
        setUser(response.user as User);
        router.push("/dashboard");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const response = await initiateGoogleOAuthPopup();
      if (response.success && response.user) {
        setUser(response.user as User);
        router.push("/dashboard");
      } else {
        throw new Error(response.message || "Google login failed");
      }
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userData: {
    firstName: string;
    role?: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await apiRegister(userData);
      if (response.success && response.user) {
        setUser(response.user as User);
        router.push("/dashboard");
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear user state even if API call fails
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


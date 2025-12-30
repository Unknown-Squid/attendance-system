"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from "@/app/ApiClient/authentication/login";

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
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
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


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Contexts/AuthContext";
import LoginHeader from "@/app/Components/Sections/Login/LoginHeaderSection";
import LoginForm from "@/app/Components/Sections/Login/LoginFormSection";
import LoginFooter from "@/app/Components/Sections/Login/LoginFooterSection";

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md">

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
          {/* Logo and Title */}
          <LoginHeader />

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <LoginFooter />
        </div>
        
      </div>
    </div>
  );};

export default LoginPage;
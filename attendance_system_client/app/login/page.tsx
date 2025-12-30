"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoIcon from "@/app/Components/Icons/LogoIcon";
import Input from "@/app/Components/Fields/Input";
import Button from "@/app/Components/Buttons/Button";
import { useAuth } from "@/app/Contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    
    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      // Navigation is handled by AuthContext
    } catch (error: any) {
      setApiError(error.message || "Login failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <LogoIcon className="w-16 h-16 text-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-center text-foreground mb-2">
              Attendance System
            </h1>
            <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
              Using QR Code and OCR
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-foreground focus:ring-2 focus:ring-foreground"
                />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-foreground hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            {apiError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                {apiError}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
              disabled={isLoading || authLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-foreground hover:underline font-medium">
                Contact Administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


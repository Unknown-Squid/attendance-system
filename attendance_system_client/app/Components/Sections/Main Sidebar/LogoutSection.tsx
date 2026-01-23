"use client";

import Button from "@/app/Components/Fields/Buttons";
import { useAuth } from "@/app/Contexts/AuthContext";

const LogoutSection = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mb-3 px-4">
        <p className="text-sm font-medium text-foreground">
          Welcome, {user?.firstName || 'User'}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {user?.email || 'user@example.com'}
        </p>
      </div>
      <Button variant="outline" onClick={handleLogout} className="w-full">
        Logout
      </Button>
    </div>
  );
};

export default LogoutSection;


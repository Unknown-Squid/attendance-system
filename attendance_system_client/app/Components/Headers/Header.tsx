"use client";

import { useAuth } from "@/app/Contexts/AuthContext";
import PersonIcon from "@mui/icons-material/Person";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();
  
  return (
    <div className="mb-8 flex justify-between items-center h-fit w-full">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
        {subtitle && (
          <p className="text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>

      <div className="mb-3 px-4 gap-4 flex h-full justify-center items-center">
        <div className="h-fit w-fit flex flex-col">
          <p className="text-sm font-medium text-foreground">
            Welcome, {user?.firstName || "User"}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {user?.email || "user@example.com"}
          </p>
        </div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <PersonIcon className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
        </div>
      </div>
    </div>
  );
}


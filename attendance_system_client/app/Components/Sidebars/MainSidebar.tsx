"use client";

import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoIcon from "@/app/Components/Icons/LogoIcon";
import Button from "@/app/Components/Buttons/Button";
import { useAuth } from "@/app/Contexts/AuthContext";

interface MainSidebarProps {
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

export default function MainSidebar({
  activeMenu,
  onMenuChange,
}: MainSidebarProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { id: "attendance", label: "Attendance", icon: EventAvailableIcon, path: "/attendance" },
    { id: "students", label: "Students", icon: PeopleIcon, path: "/students" },
    { id: "records", label: "Records", icon: DescriptionIcon, path: "/records" },
    ...(user?.role === 'admin' ? [{ id: "users", label: "User Management", icon: AdminPanelSettingsIcon, path: "/users" }] : []),
  ];

  const handleMenuClick = (itemId: string, path: string) => {
    onMenuChange(itemId);
    router.push(path);
  };

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-foreground" />
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Attendance System
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              QR Code & OCR
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id, item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? "bg-foreground text-background"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
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
    </aside>
  );
}

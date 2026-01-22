"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "@/app/Contexts/AuthContext";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface NavigationMenuItemsProps {
  activeMenu: string;
  onMenuClick: (itemId: string, path: string) => void;
}

const NavigationMenuItems = ({
  activeMenu,
  onMenuClick,
}: NavigationMenuItemsProps) => {
  const { user } = useAuth();

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { id: "attendance", label: "Attendance", icon: EventAvailableIcon, path: "/attendance" },
    { id: "students", label: "Students", icon: PeopleIcon, path: "/students" },
    { id: "records", label: "Records", icon: DescriptionIcon, path: "/records" },
    ...(user?.role === 'admin' ? [{ id: "users", label: "User Management", icon: AdminPanelSettingsIcon, path: "/users" }] : []),
  ];

  return (
    <>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <li key={item.id}>
            <button
              onClick={() => onMenuClick(item.id, item.path)}
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
    </>
  );};

export default NavigationMenuItems;
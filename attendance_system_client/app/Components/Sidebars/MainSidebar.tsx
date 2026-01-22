"use client";

import NavigationMenu from "@/app/Components/Menu/NavigationMenu";
import LogoSection from "@/app/Components/Sections/Main Sidebar/LogoSection";
import LogoutSection from "@/app/Components/Sections/Main Sidebar/LogoutSection";

interface MainSidebarProps {
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

const MainSidebar = ({
  activeMenu,
  onMenuChange,
}: MainSidebarProps) => {
  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
      {/* Logo Section */}
      <LogoSection />
      {/* Menu Items */}
      <NavigationMenu activeMenu={activeMenu} onMenuChange={onMenuChange} />
      {/* Logout Section */}
      <LogoutSection />
    </aside>
  );};

export default MainSidebar;
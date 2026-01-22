"use client";

import { useRouter } from "next/navigation";
import NavigationMenuItems from "@/app/Components/Menu/Menu Items/NavigationMenuItems";

interface NavigationMenuProps {
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

const NavigationMenu = ({
  activeMenu,
  onMenuChange,
}: NavigationMenuProps) => {
  const router = useRouter();

  const handleMenuClick = (itemId: string, path: string) => {
    onMenuChange(itemId);
    router.push(path);
  };

  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        <NavigationMenuItems activeMenu={activeMenu} onMenuClick={handleMenuClick} />
      </ul>
    </nav>
  );
};

export default NavigationMenu;


import { SidebarContainer } from "@/features/sidebar/components/SidebarContainer";
import UserIcon from "@/features/navigation/components/UserIcon";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex-1"></div>

      <div className="flex items-center space-x-4">
        <div className="flex h-8 w-8 items-center justify-center">
          <SidebarContainer />
        </div>
        <div className="flex h-8 w-8 items-center justify-center">
          <UserIcon />
        </div>
      </div>
    </div>
  );
}

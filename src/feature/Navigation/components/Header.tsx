import UserIcon from "@/feature/Navigation/components/UserIcon";
import { SidebarContainer } from "@/feature/Sidebar/layout/SidebarContainer";

const Header = () => {
  return (
    <div className="bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-800 ml-10">web-hunting</h1>

        <div className="flex items-center space-x-4 mr-10">
          <UserIcon />
          <SidebarContainer />
        </div>
      </div>
    </div>
  );
};

export default Header;

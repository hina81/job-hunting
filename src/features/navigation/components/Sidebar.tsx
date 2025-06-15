import { ViewType } from "@/types/types";
import { LayoutGrid, FileText } from "lucide-react";

type SidebarProps = {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
};

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const menuItems = [
    {
      icon: LayoutGrid,
      label: "ダッシュボード",
      view: "table" as ViewType,
    },
    {
      icon: FileText,
      label: "カレンダー",
      view: "calendar" as ViewType,
    },
  ];

  return (
    <div className="flex h-full w-60 flex-col bg-white shadow-sm z-10">
      <div className="flex items-center space-x-2 px-6 py-6">
        <div className="text-2xl font-light text-gray-400 tracking-wider">
          A
        </div>
        <div className="text-xs text-gray-300 font-light">app</div>
      </div>

      <div className="flex-grow overflow-y-auto px-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeView === item.view;

            return (
              <div
                key={index}
                onClick={() => onViewChange(item.view)}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <IconComponent
                  size={18}
                  className={`mr-3 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                <span className="font-normal">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { ViewType } from "@/types/types";
import React from "react";

type View = {
  name: string;
  type: ViewType;
  icon: React.ReactNode;
};

type Props = {
  views: View[];
  activeView: ViewType;
  onChangeView: (view: ViewType) => void;
};

const TabSwitcher = ({ views, activeView, onChangeView }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 ml-15">
        {views.map((view) => (
          <button
            type="button"
            key={view.type}
            onClick={() => {
              onChangeView(view.type);
            }}
            className={`
              w-36 h-12 
              border border-gray-200
              rounded-t-lg
              border-b-0
              flex items-center justify-center
              font-medium
              cursor-pointer
              transition-all duration-200
              ${
                activeView === view.type
                  ? "bg-cyan-500 text-white border-gray-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-600 border-gray-200"
              }
            `}
          >
            <span className="mr-2">{view.icon}</span>
            {view.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;

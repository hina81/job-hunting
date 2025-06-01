"use client";
import TabSwitcher from "@/feature/Navigation/components/TabSwitcher";
import { ViewType } from "@/types/types";
import { useState } from "react";
import { Calendar, Table } from "lucide-react";
import TableView from "@/feature/Table/layout/TableContainer";
import CalendarView from "@/feature/Calender/layout/CalenderContainer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const views = [
    {
      name: "Table",
      type: "table" as ViewType,
      icon: <Table size={16} />,
    },
    {
      name: "Calendar",
      type: "calendar" as ViewType,
      icon: <Calendar size={16} />,
    },
  ];
  const [activeView, setActiveView] = useState<ViewType>("table");

  const handleChangeView = (view: ViewType) => {
    setActiveView(view);
  };

  const renderContent = () => {
    switch (activeView) {
      case "table":
        return <TableView />;
      case "calendar":
        return <CalendarView />;
      default:
        return <TableView />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 pt-2">
          <TabSwitcher
            views={views}
            activeView={activeView}
            onChangeView={handleChangeView}
          />
          {/* <Button onClick={()=>{
            fetch("/api/companies",{method: "POST"})
          }}>会社サンプル生成</Button> */}
        </div>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
}

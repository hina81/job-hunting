"use client";

import { useState } from "react";
import TableView from "./TableView";
import CalendarView from "./CalenderView";
import { Company, ViewType } from "@/types/types";
import { Sidebar } from "@/features/navigation/components/Sidebar";
import Header from "@/features/navigation/components/Header";

type ViewContainerProps = {
  companies: Company[];
};

const ViewContainer = ({ companies }: ViewContainerProps) => {
  const [activeView, setActiveView] = useState<ViewType>("table");

  const renderContent = () => {
    switch (activeView) {
      case "table":
        return <TableView companies={companies} />;
      case "calendar":
        return <CalendarView />;
      default:
        return <TableView companies={companies} />;
    }
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex h-full overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={handleViewChange} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ViewContainer;

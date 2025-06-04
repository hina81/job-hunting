"use client";
import { useState } from "react";

import { useGetTasks } from "../hooks/useGetTasks";
import { TableHeader } from "../components/TableHeader";
import { TableRow } from "../components/TableRow";
import { Modal } from "../components/Modal";

import { Task } from "@/types/types";

import { Plus } from "lucide-react";

const TableContainer = () => {
  const { tasks } = useGetTasks();

  return (
    <div className="w-full border-collapse">
      <div className="">
        <TableHeader />
      </div>

      <div className="divide-y divide-gray-200 bg-white">
        {tasks.length > 0 || tasks ? (
          tasks.map((task) => <TableRow key={task.id} task={task} />)
        ) : (
          <div>データがありません</div>
        )}
      </div>
    </div>
  );
};

export default TableContainer;

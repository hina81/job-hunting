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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <table className="w-full border-collapse">
        <thead className="">
          <TableHeader />
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          <tr
            className="group ml-6 cursor-pointer"
            onClick={() => setSelectedTask(null)}
          >
            <td
              colSpan={4}
              className="flex whitespace-nowrap px-6 py-4 pl-25 text-sm text-cyan-500 hover:text-cyan-600"
            >
              <Plus size={20} />
              <p className="pl-2">新しい選考状況を追加</p>
            </td>
          </tr>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="group hover:bg-gray-50 ml-6"
              onClick={() => setSelectedTask(task)}
            >
              <TableRow task={task} />
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        data={selectedTask || ({} as Task)}
      />
    </>
  );
};

export default TableContainer;

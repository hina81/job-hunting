"use client";
import { useState } from "react";

import { useGetTasks } from "../hooks/useGetTasks";
import { TableHeader } from "../components/TableHeader";
import { TableRow } from "../components/TableRow";
import { Modal } from "../components/Modal";

import { Task } from "@/types/types";

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

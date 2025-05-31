"use client";

import { TableHeader } from "../components/TableHeader";
import { TableRow } from "../components/TableRow";
import { useGetTasks } from "../hooks/useGetTasks";

const TableContainer = () => {
  const { tasks } = useGetTasks();

  return (
    <table className="w-full border-collapse">
      <thead className="">
        <TableHeader />
      </thead>

      <tbody className="divide-y divide-gray-200 bg-white">
        {tasks.map((task) => (
          <TableRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

export default TableContainer;

"use client";

import { useGetTasks } from "../hooks/useGetTasks";
import { TableHeader } from "../components/TableHeader";
import { TableRow } from "../components/TableRow";

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

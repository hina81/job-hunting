"use client";
import { Task } from "@/types/types";

type Props = {
  task: Task;
};

export const TableRow = ({ task }: Props) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="group hover:bg-gray-50 ml-6">
      <div className="whitespace-nowrap px-6 py-4 pl-25">
        <div className="text-sm font-medium text-gray-900">{task.name}</div>
      </div>
      <div className="whitespace-nowrap px-6 py-4 pl-25 text-sm text-gray-500">
        {task.nextStep || "—"}
      </div>
      <div className="whitespace-nowrap px-6 py-4 pl-25 text-sm text-gray-500">
        {formatDate(task.dueDate) || "—"}
      </div>
      <div className="px-6 py-4 pl-25">
        <div className="flex flex-wrap gap-1">
          {/* apiでタグを返していないので一旦コメントアウト */}
          {/* {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
            >
              {tag}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

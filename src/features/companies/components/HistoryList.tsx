"use client";

import { Progress } from "@/types/types";

type HistoryListProps = {
  progresses: Progress[];
};

export default function HistoryList({ progresses }: HistoryListProps) {
  return (
    <div className="flex flex-col">
      {progresses.map((progress, index) => (
        <div
          key={index}
          className={"p-4 mb-2 border-l-3 border-blue-200"}
        >
          <div className="font-bold">{progress.task}</div>
          <div className="text-sm text-gray-500">
            {new Date(progress.deadline).toLocaleDateString()}
          </div>
        </div>
      ))}
      {progresses.length === 0 && (
        <p className="p-4 text-center text-gray-500">まだ進捗がありません</p>
      )}
    </div>
  );
}

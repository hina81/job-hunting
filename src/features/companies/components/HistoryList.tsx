"use client";

import { Progress } from "@/types/types";
import { useState, useEffect } from "react";

interface HistoryListProps {
  companyId: string;
}

export default function HistoryList({ companyId }: HistoryListProps) {
  const [progresses, setProgresses] = useState<Progress[]>([]);

  useEffect(() => {
    const fetchProgresses = async () => {
      const response = await fetch(`/api/companies/${companyId}/progresses`);
      const data = await response.json();
      setProgresses(data.data);
    };

    fetchProgresses();
  }, [companyId]);

  return (
    <div className="flex flex-col">
      {progresses.map((progress, index) => (
        <div
          // key={progress.id}
          className={`p-4 ${index !== progresses.length - 1 ? "border-b" : ""}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{progress.status}</span>
            <span className="text-sm text-gray-500">
              {new Date(progress.date).toLocaleDateString()}
            </span>
          </div>
          {progress.nextAction && (
            <p className="text-sm text-gray-600 mt-2">
              次のアクション: {progress.nextAction}
            </p>
          )}
        </div>
      ))}
      {progresses.length === 0 && (
        <p className="p-4 text-center text-gray-500">まだ進捗がありません</p>
      )}
    </div>
  );
}

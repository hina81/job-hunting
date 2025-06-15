"use client";
import { Company } from "@/types/types";
import Link from "next/link";

type TableViewProps = {
  companies: Company[];
};

const TableView = ({ companies }: TableViewProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="bg-white border border-gray-300">
        <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-300">
          <div className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
            企業名
          </div>
          <div className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
            タスク
          </div>
          <div className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">
            期日
          </div>
          <div className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            ステータス
          </div>
        </div>

        <div>
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <Link
                key={company.id}
                href={`/companies/${company.id}`}
                className={`grid grid-cols-4 hover:bg-gray-50 ${
                  index !== companies.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="px-4 py-3 border-r border-gray-200">
                  <div className="text-sm font-medium text-gray-900">
                    {company.name}
                  </div>
                </div>
                <div className="px-4 py-3 border-r border-gray-200">
                  <div className="text-sm text-gray-700">
                    {company.progresses[company.progresses.length - 1]?.task ||
                      "—"}
                  </div>
                </div>
                <div className="px-4 py-3 border-r border-gray-200">
                  <div className="text-sm text-gray-700">
                    {company.progresses[company.progresses.length - 1]?.deadline
                      ? new Date(
                          company.progresses[
                            company.progresses.length - 1
                          ].deadline
                        ).toLocaleDateString()
                      : "—"}
                  </div>
                </div>
                <div className="px-4 py-3 border-r border-gray-200">
                  <span className="text-sm text-gray-700">
                    {company.status || "—"}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500 border-b border-gray-200">
              データがありません
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => {
            fetch("/api/companies", { method: "POST" });
          }}
          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          + 新規追加
        </button>
      </div>
    </div>
  );
};

export default TableView;

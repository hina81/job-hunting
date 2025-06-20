"use client";
import { Company } from "@/types/types";
import Link from "next/link";
import CreateCompanyForm from "../components/CreateCompanyModal";

type TableViewProps = {
  companies: Company[];
};

const TableView = ({ companies }: TableViewProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white ">
        <div className="grid text-gray-500 text-left text-xs font-semibold grid-cols-4 bg-gray-50 border-b border-gray-200">
          <div className="px-4 py-3">企業名</div>
          <div className="px-4 py-3">タスク</div>
          <div className="px-4 py-3">期日</div>
          <div className="px-4 py-3">ステータス</div>
        </div>

        <div>
          {companies.length > 0 ? (
            companies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.id}`}
                className={
                  "grid grid-cols-4 hover:bg-gray-50 border-b border-gray-200"
                }
              >
                <div className="px-4 py-3 ">
                  <div className="text-sm font-medium text-gray-900">
                    {company.name}
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-sm text-gray-500">
                    {company.progresses[company.progresses.length - 1]?.task ||
                      "—"}
                  </div>
                </div>
                <div className="px-4 py-3 ">
                  <div className="text-sm text-gray-500">
                    {company.progresses[company.progresses.length - 1]?.deadline
                      ? new Date(
                          company.progresses[
                            company.progresses.length - 1
                          ].deadline
                        ).toLocaleDateString()
                      : "—"}
                  </div>
                </div>
                <div className="px-4 py-3 ">
                  <span className="text-sm text-gray-500">
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
        <CreateCompanyForm />
      </div>
    </div>
  );
};

export default TableView;

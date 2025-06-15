"use client";

import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Company } from "@/types/types";
import HistoryList from "../components/HistoryList";
import MemoEditor from "../components/MemoEditor";

type CompanyDetailViewProps = {
  company: Company;
};

export const CompanyDetailView = ({ company }: CompanyDetailViewProps) => {
  const router = useRouter();

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <Button variant="outline" onClick={() => router.back()}>
            戻る
          </Button>
        </div>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div>
            <div className="flex items-center text-sm font-medium text-blue-600">
              <CalendarClock className="h-5 w-5 text-blue-600 mr-2" />
              次の予定
            </div>
            <p className="text-sm font-medium text-blue-600 mt-1">
              {company.progresses?.[company.progresses.length - 1]?.deadline &&
                new Date(
                  company.progresses[company.progresses.length - 1].deadline
                ).toLocaleDateString()}{" "}
              :{" "}
              {company.progresses?.[company.progresses.length - 1]?.task ||
                "未設定"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4">選考状況の履歴</h2>
            <div>
              <HistoryList progresses={company.progresses} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">メモ</h2>
            <MemoEditor />
          </section>
        </div>
      </div>
    </div>
  );
};

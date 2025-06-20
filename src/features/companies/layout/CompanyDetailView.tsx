"use client";

import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Company } from "@/types/types";
import HistoryList from "../components/HistoryList";
import MemoEditor from "../components/MemoEditor";
import EditTitle from "../components/EditTitle";
import { useState } from "react";
import { useUpdateCompanyMutation } from "../hooks/useUpdateCompanyMutation";
import CreateProgressForm from "../components/CreateProgressModal";

type CompanyDetailViewProps = {
  company: Company;
};

export const CompanyDetailView = ({ company }: CompanyDetailViewProps) => {
  const router = useRouter();
  const [name, setName] = useState(company.name);
  const { updateCompanyTitle } = useUpdateCompanyMutation();

  const handleTitleSave = async (newTitle: string) => {
    setName(newTitle);
    try {
      await updateCompanyTitle(company.id, newTitle);
    } catch (error) {
      console.error("企業名の更新に失敗しました：", error);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <EditTitle value={name} onSave={handleTitleSave} />
          <Button variant="outline" onClick={() => router.push("/")}>
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

            <CreateProgressForm companyId={company.id} />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">メモ</h2>
            <MemoEditor companyId={company.id} initialMemo={company.notes} />
          </section>
        </div>
      </div>
    </div>
  );
};

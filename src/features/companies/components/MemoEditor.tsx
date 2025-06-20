import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useUpdateCompanyMutation } from "../hooks/useUpdateCompanyMutation";
import { Company } from "@/types/types";

type MemoProps = {
  companyId: Company["id"];
  initialMemo: Company["notes"];
};

const MemoEditor = ({ companyId, initialMemo }: MemoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedMemo, setMemo] = useState(initialMemo);
  const [draftMemo, setDraftMemo] = useState(initialMemo);
  const { updateCompanyNotes } = useUpdateCompanyMutation();

  useEffect(() => {
    setMemo(initialMemo);
    setDraftMemo(initialMemo);
  }, [initialMemo]);

  const handleEdit = () => {
    setDraftMemo(savedMemo);
    setIsEditing(true);
  };

  const handleMemoSave = async () => {
    const memoToSave = draftMemo ?? "";
    setMemo(memoToSave);
    try {
      await updateCompanyNotes(companyId, memoToSave);
    } catch (error) {
      console.error("メモの更新に失敗しました：", error);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftMemo(savedMemo);
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <div className="border border-transparent p-2">
          {!savedMemo ? (
            <p className="text-gray-400 italic">メモはまだありません</p>
          ) : (
            <ReactMarkdown>{savedMemo}</ReactMarkdown>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1"
            >
              <span className="px-2">編集</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={draftMemo ?? ""}
            onChange={(e) => setDraftMemo(e.target.value)}
            className="border border-gray-400 p-2 w-full h-40 rounded"
            placeholder="## ここにメモを書いてください。例: 面接の情報, 次のステップの確認"
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={handleMemoSave}
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1"
            >
              <span className="px-2">保存</span>
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1"
            >
              <span>キャンセル</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoEditor;

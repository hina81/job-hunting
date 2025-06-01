import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const MemoEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(
    "## ここにメモを書いてください。\n\n- 例: 面接の情報\n- 例: 次のステップの確認"
  );
  const [tempMemo, setTempMemo] = useState(memo);

  const handleEdit = () => {
    setTempMemo(memo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setMemo(tempMemo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMemo(memo);
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <div className="border border-transparent p-2">
          <ReactMarkdown>{memo}</ReactMarkdown>
          <div className="flex justify-end">
            <button
              onClick={handleEdit}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
              編集
            </button>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={tempMemo}
            onChange={(e) => setTempMemo(e.target.value)}
            className="border border-gray-400 p-2 w-full h-40 rounded"
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-1 rounded"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoEditor;

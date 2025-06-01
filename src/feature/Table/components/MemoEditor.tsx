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
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1"
            >
             
              <span className="px-2">編集</span>
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

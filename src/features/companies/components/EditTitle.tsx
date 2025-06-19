import { useState } from "react";
import { Pencil } from "lucide-react";

interface EditTitleProps {
  value: string;
  onSave: (newValue: string) => void;
}

export default function EditTitle({ value, onSave }: EditTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    if (draft !== value) {
      onSave(draft);
    }
  };

  return (
    <div className="flex items-center mb-4">
      {isEditing ? (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          autoFocus
          className="text-2xl font-bold border-b border-blue-300 focus:outline-none"
        />
      ) : (
        <>
          <h1 className="text-2xl font-bold">{value}</h1>
          <button
            onClick={() => {
              setIsEditing(true);
              setDraft(value);
            }}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}

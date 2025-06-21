import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { useRouter } from "next/navigation";
import { useCreateProgressMutation } from "../hooks/useCreateProgressMutation";

type CreateProgressFormProps = {
  companyId: string;
};

const CreateProgressForm = ({ companyId }: CreateProgressFormProps) => {
  const [formData, setFormData] = useState({
    taskName: "",
    date: undefined as Date | undefined,
    time: "10:00:00",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { createProgress } = useCreateProgressMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.taskName.trim()) {
      setError("タスク名を入力してください");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);

      let deadline: string | undefined;
      if (formData.date) {
        const [hours, minutes] = formData.time.split(":");
        const deadlineDate = new Date(formData.date);
        deadlineDate.setHours(parseInt(hours), parseInt(minutes));
        deadline = deadlineDate.toISOString();
      }

      await createProgress(companyId, {
        task: formData.taskName.trim(),
        deadline,
      });

      setFormData({
        taskName: "",
        date: undefined,
        time: "10:30:00",
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "進捗の作成に失敗しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-between mt-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-sm font-medium text-gray-700 bg-white hover:text-gray-500">
          + 選考状況を追加する
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              選考状況を追加する
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-gray-500">
            選考状況を入力してください。
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="taskName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                タスク名
              </label>
              <input
                type="text"
                id="taskName"
                value={formData.taskName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, taskName: e.target.value }))
                }
                disabled={isLoading}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="taskName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                期限
              </label>
              <DatePicker
                date={formData.date}
                time={formData.time}
                onDateChange={(date) =>
                  setFormData((prev) => ({ ...prev, date }))
                }
                onTimeChange={(time) =>
                  setFormData((prev) => ({ ...prev, time }))
                }
                disabled={isLoading}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || !formData.taskName.trim()}
              className="w-full px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "追加中..." : "追加"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProgressForm;

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
import { CalendarButton } from "./CalendarButton";
import { Company } from "@/types/types";

type CreateProgressFormProps = {
  company: Company;
};

const CreateProgressForm = ({ company }: CreateProgressFormProps) => {
  const [formData, setFormData] = useState({
    taskName: "",
    date: undefined as Date | undefined,
    time: "10:00:00",
  });
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { createProgress } = useCreateProgressMutation();

  const handleCreateProgress = async () => {
    if (!formData.taskName.trim()) {
      setError("タスク名を入力してください");
      throw new Error("タスク名を入力してください");
    }

    let deadline: string | undefined;
    if (formData.date) {
      const [hours, minutes] = formData.time.split(":");
      const deadlineDate = new Date(formData.date);
      deadlineDate.setHours(parseInt(hours), parseInt(minutes));
      deadline = deadlineDate.toISOString();
    }

    await createProgress(company.id, {
      task: formData.taskName.trim(),
      deadline,
    });

    // 成功時リセット
    setFormData({
      taskName: "",
      date: undefined,
      time: "10:30:00",
    });
    setError(null);
    setOpen(false);
    router.refresh();
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

          <div className="space-y-4">
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
                placeholder="例: 書類選考、一次面接..."
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                期限・日程
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
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <CalendarButton
              companyName={company.name}
              taskName={formData.taskName}
              deadline={formData.date}
              onCreateEvent={handleCreateProgress}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProgressForm;

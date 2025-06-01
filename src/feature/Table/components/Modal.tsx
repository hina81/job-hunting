import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarClock } from "lucide-react";
import { Task } from "@/types/types";
import HistoryList from "./HistoryList";
import MemoEditor from "./MemoEditor";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Task;
};

export const Modal = ({ isOpen, onClose, data }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div>
            <div className="flex items-center text-sm font-medium text-blue-600">
              <CalendarClock className="h-5 w-5 text-blue-600 mr-2" />
              次の予定
            </div>
            <p className="text-sm font-medium text-blue-600 mt-1">
              {data.dueDate} : {data.nextSchedule}
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold">選考状況の履歴</p>
          <HistoryList />
          <p className="font-semibold">メモ</p>
          <MemoEditor />
        </div>
      </DialogContent>
    </Dialog>
  );
};

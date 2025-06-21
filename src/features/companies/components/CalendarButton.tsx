import { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { CalendarEvent } from "@/types/types";
import { useCalendarMutation } from "../hooks/useCalendarMutation";
import { Switch } from "@/components/ui/switch";

type CalendarButtonProps = {
  eventData?: Partial<CalendarEvent>;
  companyName?: string;
  taskName?: string;
  deadline?: Date;
  onCreateEvent?: () => Promise<void>;
};

export const CalendarButton = ({
  eventData,
  companyName,
  taskName,
  deadline,
  onCreateEvent,
}: CalendarButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [addToCalendar, setAddToCalendar] = useState(false);
  const { createEvent } = useCalendarMutation();

  const buildEvent = (): CalendarEvent => {
    const defaultStartTime =
      deadline?.toISOString() || new Date().toISOString();
    const defaultEndTime = deadline
      ? new Date(deadline.getTime() + 60 * 60 * 1000).toISOString()
      : new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();

    return {
      summary:
        eventData?.summary ||
        (taskName ? `${companyName} - ${taskName}` : "新しいイベント"),
      description:
        eventData?.description ||
        (companyName
          ? `企業: ${companyName}\nタスク: ${taskName}`
          : "イベントの説明"),
      start: eventData?.start || {
        dateTime: defaultStartTime,
        timeZone: "Asia/Tokyo",
      },
      end: eventData?.end || {
        dateTime: defaultEndTime,
        timeZone: "Asia/Tokyo",
      },
      ...(eventData?.location && { location: eventData.location }),
      ...(eventData?.attendees && { attendees: eventData.attendees }),
    };
  };

  const handleCreateWithCalendar = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      if (onCreateEvent) {
        await onCreateEvent();
      }

      // Switchがtrueの場合、カレンダーに追加
      if (addToCalendar) {
        const event = buildEvent();
        await createEvent(event);
        setMessage("進捗とカレンダーに追加しました！");
      } else {
        setMessage("進捗を追加しました！");
      }

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "追加に失敗しました";
      setMessage(errorMessage);

      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between pt-4 border-t w-full">
      <div className="flex items-center gap-2">
        <Switch
          checked={addToCalendar}
          onCheckedChange={setAddToCalendar}
          disabled={isLoading}
        />
        <span className="text-sm text-gray-600">カレンダーにも追加する</span>
      </div>

      <button
        onClick={handleCreateWithCalendar}
        disabled={isLoading || !taskName?.trim()}
        className="
          px-4 py-2 text-sm
          bg-cyan-500 text-white hover:bg-cyan-600
          rounded font-medium transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
        "
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            追加中...
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            {addToCalendar ? "進捗 + カレンダー追加" : "進捗追加"}
          </>
        )}
      </button>

      {message && (
        <p
          className={`text-xs mt-2 ${
            message.includes("失敗") || message.includes("エラー")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

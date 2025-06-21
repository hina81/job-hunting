import { CalendarEvent } from "@/types/types";

export const useCalendarMutation = () => {
  const createEvent = async (event: CalendarEvent, accountId?: string) => {
    try {
      const body: any = { event };
      if (accountId) {
        body.accountId = accountId;
      }

      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "イベントの作成に失敗しました");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  return { createEvent };
};

export type Task = {
  id: string;
  name: string;
  nextSchedule: string | null;
  dueDate: string | null;
  tags: string[];
};

export type ViewType = "table" | "calendar";

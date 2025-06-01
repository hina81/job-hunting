import { Task } from "@/types/types";
import { useEffect, useState } from "react";

export function useGetTasks(): { tasks: Task[] } {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    (async () => {
      // const url = "/tasks.json";
      const url = "/api/companies"
      const response = await fetch(url);
      const data = await response.json();
      const tasks:Task[] = data.data
      console.log("tasks:", tasks);
      setTasks(tasks);
    })();
  }, []);
  return { tasks };
}

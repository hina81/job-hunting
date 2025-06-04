import { Task } from "@/types/types";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function useGetTasks(): { tasks: Task[] } {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isPending } = authClient.useSession();
  useEffect(() => {
    if (data) {
      (async () => {
        // const url = "/tasks.json";
        const url = "/api/companies";
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data);
        const tasks: Task[] = data.data;
        setTasks(tasks);
      })();
    }
  }, [data]);
  return { tasks };
}

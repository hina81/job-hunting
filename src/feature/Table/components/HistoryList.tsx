import { Task } from "@/types/types";

type Prop = {
  company: Task;
  history: HistoryEntry[];
};

type HistoryEntry = {
  status: string;
  date: string; //一旦string
  memo: string;
};

const history = [
  { status: "エントリー済み", date: "2025/12/15", memo: "めも" },
  { status: "書類選考通過", date: "2025/12/20", memo: "めも" },
  { status: "一次面接通過", date: "2025/12/25", memo: "めも" },
];

const HistoryList = () => {
  return (
    <div>
      {history.map((entry, index) => (
        <div key={index} className=" my-4 px-4  border-l-3 border-blue-200">
          <div className="text-sm font-semibold">{entry.status}</div>
          <div className="text-xs text-gray-500">{entry.date}</div>
          <p className="mt-1 text-sm text-gray-700">{entry.memo}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;

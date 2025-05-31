export const TableHeader = () => (
  <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
    {["企業名", "次の予定", "日程・締切", "タグ"].map(
      (label) => (
        <th key={label} className="px-6 py-3 pl-25">
          <span>{label}</span>
        </th>
      )
    )}
  </tr>
);

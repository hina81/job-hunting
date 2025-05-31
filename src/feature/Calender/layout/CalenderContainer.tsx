const CalendarView = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div
              key={day}
              className="p-3 text-center font-medium text-gray-600 bg-gray-50 rounded"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }, (_, i) => {
            const date = i - 5; // 適当な日付計算
            const isToday = date === 15;
            const hasEvent = [10, 15, 22].includes(date);

            return (
              <div
                key={i}
                className={`
                    h-20 p-2 border border-gray-100 rounded relative
                    ${
                      isToday
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }
                    ${date < 1 ? "text-gray-300" : "text-gray-700"}
                  `}
              >
                {date > 0 && (
                  <>
                    <span
                      className={`text-sm ${
                        isToday ? "font-bold text-blue-600" : ""
                      }`}
                    >
                      {date}
                    </span>
                    {hasEvent && (
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded text-center">
                          面接
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
export default CalendarView;

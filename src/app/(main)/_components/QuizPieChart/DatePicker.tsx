"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type DatePickerProps = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  const currentDate = dayjs(selectedDate);
  const today = dayjs();

  const handlePrevDay = () => {
    const newDate = currentDate.subtract(1, "day");
    setSelectedDate(newDate.format("YYYY-MM-DD"));
  };

  const handleNextDay = () => {
    const newDate = currentDate.add(1, "day");
    setSelectedDate(newDate.format("YYYY-MM-DD"));
  };

  const isNextDisabled = currentDate.isSame(today, "day");

  return (
    <div className="flex items-center justify-center gap-4 p-4 pb-0">
      <button onClick={handlePrevDay} className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>
      <div className="text-lg font-semibold text-gray-900">{currentDate.locale("ko").format("YYYY년 MM월 DD일")}</div>
      <button
        onClick={handleNextDay}
        className={`p-2 rounded-lg transition-colors ${
          isNextDisabled ? "cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer"
        }`}
        disabled={isNextDisabled}
      >
        <ChevronRightIcon className={`w-6 h-6 ${isNextDisabled ? "text-gray-500" : "text-gray-700"}`} />
      </button>
    </div>
  );
}

export default DatePicker;

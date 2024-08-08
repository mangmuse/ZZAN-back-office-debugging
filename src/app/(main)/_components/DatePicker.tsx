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

  const handlePrevDay = () => {
    const newDate = currentDate.subtract(1, "day");
    setSelectedDate(newDate.format("YYYY-MM-DD"));
  };

  const handleNextDay = () => {
    const newDate = currentDate.add(1, "day");
    setSelectedDate(newDate.format("YYYY-MM-DD"));
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button onClick={handlePrevDay} className="p-2 rounded-lg hover:bg-gray-200">
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>
      <div className="text-lg font-semibold text-gray-900">{currentDate.locale("ko").format("YYYY년 MM월 DD일")}</div>
      <button onClick={handleNextDay} className="p-2 rounded-lg hover:bg-gray-200">
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}

export default DatePicker;

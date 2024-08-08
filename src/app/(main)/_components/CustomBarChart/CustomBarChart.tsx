"use client";

import { useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import dayjs from "dayjs";
import CustomTooltip from "@/app/(main)/_components/CustomBarChart/CustomTooltip";
import { TABS, TTabType } from "@/app/(main)/_constant";
import LoadingSpinner from "@/components/LoadingSpinner";

type CustomBarChartProps = {
  useQuery: () => UseQueryResult<Record<string, number>, Error>;
  title?: string;
  description?: string;
  label: string;
  selectedTab: TTabType;
};

const tabColors: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "text-green-400 fill-green-400",
  [TABS.KNOWHOWS]: "text-blue-400 fill-blue-400",
  [TABS.VOTES]: "text-red-400 fill-red-400",
  [TABS.COMMENTS]: "text-yellow-400 fill-yellow-400"
};

const spinnerColors: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "text-green-400",
  [TABS.KNOWHOWS]: "text-blue-400",
  [TABS.VOTES]: "text-red-400",
  [TABS.COMMENTS]: "text-yellow-400"
};

function CustomBarChart({ useQuery, title = "", description = "", label, selectedTab }: CustomBarChartProps) {
  const { data: counts, isPending } = useQuery();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = counts
    ? Object.keys(counts).map((date: string, index: number) => ({
        date: index.toString(),
        value: counts[date]
      }))
    : [];

  const maxIndex = chartData.length - 1;

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      {isPending ? (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner color={spinnerColors[selectedTab]} />
        </div>
      ) : (
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => {
              const date = dayjs()
                .subtract(maxIndex - Number(tick), "day")
                .format("YYYY.MM.DD");
              return date;
            }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip maxIndex={maxIndex} customLabel={label} />} />
          <Bar dataKey="value" className={tabColors[selectedTab]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className={index === activeIndex ? "opacity-100" : "opacity-90"}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </Bar>
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}

export default CustomBarChart;

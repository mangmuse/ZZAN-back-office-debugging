"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomBarChart from "@/app/(main)/_components/CustomBarChart/CustomBarChart";
import { TABS, TTabType } from "@/app/(main)/_constant";
import { getLabel, getQueryHook } from "@/app/(main)/_utils";
import dayjs from "dayjs";
import DatePicker from "@/app/(main)/_components/QuizPieChart/DatePicker";
import ChartTabContainer from "@/app/(main)/_components/ChartTabContainer";
import QuizPieChart from "@/app/(main)/_components/QuizPieChart/QuizPieChart";

function DashboardContainer() {
  const [selectedTab, setSelectedTab] = useState<TTabType>(TABS.SIGNUPS);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  const handleTabClick = (tab: TTabType) => {
    setSelectedTab(tab);
  };

  const queryHook = getQueryHook(selectedTab);
  const label = getLabel(selectedTab);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <Card className="w-full">
        <ChartTabContainer handleSelectTab={handleTabClick} selectedTab={selectedTab} />
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row"></CardHeader>
        <CardContent className="w-full px-2 sm:p-6">
          <CustomBarChart label={label} useQuery={queryHook} selectedTab={selectedTab} />
        </CardContent>
      </Card>

      <Card className="flex flex-col w-[600px] h-full gap-5 self-end">
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <QuizPieChart selectedDate={selectedDate} />
      </Card>
    </div>
  );
}

export default DashboardContainer;

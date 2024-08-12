"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CustomBarChart from "@/app/(main)/_components/CustomBarChart/CustomBarChart";
import { TABS, TTabType } from "@/app/(main)/_constant";
import { getLabel, getQueryHook } from "@/app/(main)/_utils";
import dayjs from "dayjs";
import DatePicker from "@/app/(main)/_components/QuizPieChart/DatePicker";
import ChartTabContainer from "@/app/(main)/_components/ChartTabContainer";
import QuizPieChart from "@/app/(main)/_components/QuizPieChart/QuizPieChart";
import useCumulativeSignupCountQuery from "@/store/queries/dashboard/cumulative/useCumulativeSignupCountQuery";
import LineChartContainer from "@/app/(main)/_components/LineChartContainer";

function DashboardContainer() {
  const [selectedTab, setSelectedTab] = useState<TTabType>(TABS.SIGNUPS);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const handleTabClick = (tab: TTabType) => {
    setSelectedTab(tab);
  };

  const queryHook = useCumulativeSignupCountQuery;
  const label = getLabel(selectedTab);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <Card className="w-full">
        <ChartTabContainer handleSelectTab={handleTabClick} selectedTab={selectedTab} />
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row"></CardHeader>
        <CardContent className="w-full px-2 sm:p-6">
          <CustomBarChart label={label} useQuery={getQueryHook(selectedTab)} selectedTab={selectedTab} />
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>누적 회원가입자 수</CardTitle>
            <CardDescription>최근 30일 동안의 누적 회원가입자 수</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChartContainer useQuery={queryHook} />
          </CardContent>
        </Card>

        <Card className="flex flex-col w-full lg:w-[600px] h-[546px] gap-5">
          <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <QuizPieChart selectedDate={selectedDate} />
        </Card>
      </div>
    </div>
  );
}

export default DashboardContainer;

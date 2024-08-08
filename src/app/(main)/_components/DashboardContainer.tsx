"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomBarChart from "@/app/(main)/_components/CustomBarChart/CustomBarChart";
import { TABS, TTabType } from "@/app/(main)/_constant";
import { getLabel, getQueryHook } from "@/app/(main)/_utils";
import dayjs from "dayjs";
import DatePicker from "@/app/(main)/_components/DatePicker";
import ChartTabContainer from "@/app/(main)/_components/ChartTabContainer";
import useQuizAnswersQuery from "@/store/queries/dashboard/useQuizAnswersQuery";

function DashboardContainer() {
  const [selectedTab, setSelectedTab] = useState<TTabType>(TABS.SIGNUPS);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const { data: quizAnswer } = useQuizAnswersQuery(selectedDate);
  quizAnswer && console.log(quizAnswer);
  const handleTabClick = (tab: TTabType) => {
    setSelectedTab(tab);
  };

  const queryHook = getQueryHook(selectedTab);
  const label = getLabel(selectedTab);

  return (
    <div className="w-full flex flex-col gap-5">
      <Card className="w-full">
        <ChartTabContainer handleSelectTab={handleTabClick} selectedTab={selectedTab} />
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row"></CardHeader>
        <CardContent className="w-full px-2 sm:p-6">
          <CustomBarChart label={label} useQuery={queryHook} selectedTab={selectedTab} />
        </CardContent>
      </Card>
      <Card className="w-full">
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Card>
    </div>
  );
}

export default DashboardContainer;

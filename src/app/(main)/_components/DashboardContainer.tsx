"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBarChart from "@/app/(main)/_components/CustomBarChart/CustomBarChart";
import ChartTab from "@/app/(main)/_components/ChartTab";
import { TABS, TTabType } from "@/app/(main)/_constant";
import { getLabel, getQueryHook } from "@/app/(main)/_utils";

function DashboardContainer() {
  const [selectedTab, setSelectedTab] = useState<TTabType>(TABS.SIGNUPS);

  const handleTabClick = (tab: TTabType) => {
    setSelectedTab(tab);
  };

  const queryHook = getQueryHook(selectedTab);
  const label = getLabel(selectedTab);

  return (
    <>
      <Card className="w-full">
        <div className="flex gap-4">
          <ChartTab
            count={1}
            label={TABS.SIGNUPS}
            isSelected={selectedTab === TABS.SIGNUPS}
            onClick={() => handleTabClick(TABS.SIGNUPS)}
          />
          <ChartTab
            count={1}
            label={TABS.KNOWHOWS}
            isSelected={selectedTab === TABS.KNOWHOWS}
            onClick={() => handleTabClick(TABS.KNOWHOWS)}
          />
          <ChartTab
            count={1}
            label={TABS.VOTES}
            isSelected={selectedTab === TABS.VOTES}
            onClick={() => handleTabClick(TABS.VOTES)}
          />
          <ChartTab
            count={1}
            label={TABS.COMMENTS}
            isSelected={selectedTab === TABS.COMMENTS}
            onClick={() => handleTabClick(TABS.COMMENTS)}
          />
        </div>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>{label}</CardTitle>
            <CardDescription></CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full px-2 sm:p-6">
          <CustomBarChart label={label} useQuery={queryHook} selectedTab={selectedTab} />
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardContainer;

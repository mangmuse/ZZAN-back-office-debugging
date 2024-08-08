import useTodaySignUpCountQuery from "@/store/queries/dashboard/today/useTodaySignUpCountQuery";
import useTodayKnowhowCountQuery from "@/store/queries/dashboard/today/useTodayKnowhowCountQuery";
import useTodayVoteCountQuery from "@/store/queries/dashboard/today/useTodayVoteCountQuery";
import useTodayCommentCountQuery from "@/store/queries/dashboard/today/useTodayCommentCountQuery";
import ChartTab from "@/app/(main)/_components/ChartTab";
import { TABS, TTabType } from "@/app/(main)/_constant";

type ChartTabContainerProps = {
  handleSelectTab: (tab: TTabType) => void;
  selectedTab: TTabType;
};

function ChartTabContainer({ handleSelectTab, selectedTab }: ChartTabContainerProps) {
  return (
    <div className="flex gap-3 p-4">
      <ChartTab
        useQuery={useTodaySignUpCountQuery}
        label={TABS.SIGNUPS}
        isSelected={selectedTab === TABS.SIGNUPS}
        onClick={() => handleSelectTab(TABS.SIGNUPS)}
      />
      <ChartTab
        useQuery={useTodayKnowhowCountQuery}
        label={TABS.KNOWHOWS}
        isSelected={selectedTab === TABS.KNOWHOWS}
        onClick={() => handleSelectTab(TABS.KNOWHOWS)}
      />
      <ChartTab
        useQuery={useTodayVoteCountQuery}
        label={TABS.VOTES}
        isSelected={selectedTab === TABS.VOTES}
        onClick={() => handleSelectTab(TABS.VOTES)}
      />
      <ChartTab
        useQuery={useTodayCommentCountQuery}
        label={TABS.COMMENTS}
        isSelected={selectedTab === TABS.COMMENTS}
        onClick={() => handleSelectTab(TABS.COMMENTS)}
      />
    </div>
  );
}

export default ChartTabContainer;

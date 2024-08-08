import { TABS, TTabType } from "@/app/(main)/_constant";
import useCommentCountQuery from "@/store/queries/dashboard/useCommentCountQuery";
import useKnowhowCountQuery from "@/store/queries/dashboard/useKnowhowCountQuery";
import useSignUpCountQuery from "@/store/queries/dashboard/useSignUpCountQuery";
import useVoteCountQuery from "@/store/queries/dashboard/useVoteCountQuery";

export const getQueryHook = (tab: TTabType) => {
  switch (tab) {
    case TABS.SIGNUPS:
      return useSignUpCountQuery;
    case TABS.KNOWHOWS:
      return useKnowhowCountQuery;
    case TABS.VOTES:
      return useVoteCountQuery;
    case TABS.COMMENTS:
      return useCommentCountQuery;
    default:
      return useSignUpCountQuery;
  }
};

export const getLabel = (tab: TTabType) => {
  switch (tab) {
    case TABS.SIGNUPS:
      return "Sign Up Count";
    case TABS.KNOWHOWS:
      return "KnowHow Count";
    case TABS.VOTES:
      return "Vote Count";
    case TABS.COMMENTS:
      return "Comment Count";
    default:
      return "Sign Up Count";
  }
};

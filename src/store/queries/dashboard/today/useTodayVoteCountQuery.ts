import { getTodayVoteCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useTodayVoteCountQuery = () => {
  return useQuery<number, Error>({
    queryKey: ["todayVoteCount"],
    queryFn: getTodayVoteCount
  });
};

export default useTodayVoteCountQuery;

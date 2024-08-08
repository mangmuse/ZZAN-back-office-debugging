import { getTodayCommentCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useTodayCommentCountQuery = () => {
  return useQuery<number, Error>({
    queryKey: ["todayCommentCount"],
    queryFn: getTodayCommentCount
  });
};

export default useTodayCommentCountQuery;

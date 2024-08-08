import { getVotes } from "@/apis/vote";
import { useQuery } from "@tanstack/react-query";

const useVotesQuery = (page: number, limit: number, selectedSearchOption: string, searchKeyword: string) => {
  return useQuery({
    queryKey: ["votes", { page, limit, selectedSearchOption, searchKeyword }],
    queryFn: () => getVotes(page, limit, selectedSearchOption, searchKeyword)
  });
};

export default useVotesQuery;

import { getVotes } from "@/apis/vote";
import { useQuery } from "@tanstack/react-query";

const useVotesQuery = (page: number, pageNumber: number) => {
  return useQuery({
    queryKey: ["votes", { page, pageNumber }],
    queryFn: () => getVotes(page, pageNumber)
  });
};

export default useVotesQuery;

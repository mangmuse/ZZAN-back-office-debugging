import { getVoteCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useVoteCountQuery = () => {
  return useQuery<Record<string, number>, Error>({
    queryKey: ["voteCount"],
    queryFn: () => getVoteCount()
  });
};

export default useVoteCountQuery;

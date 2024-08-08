import { getKnowhows } from "@/apis/knowhow";
import { useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = (page: number, limit: number, selectedSearchOption: string, searchKeyword: string) => {
  return useQuery({
    queryKey: ["knowhows", { page, limit, selectedSearchOption, searchKeyword }],
    queryFn: () => getKnowhows(page, limit, selectedSearchOption, searchKeyword)
  });
};

export default useKnowhowsQuery;

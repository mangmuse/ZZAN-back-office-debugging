import { getKnowhows } from "@/apis/knowhow";
import { useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = (page: number, pageNumber: number) => {
  return useQuery({
    queryKey: ["knowhows", { page, pageNumber }],
    queryFn: () => getKnowhows(page, pageNumber)
  });
};

export default useKnowhowsQuery;

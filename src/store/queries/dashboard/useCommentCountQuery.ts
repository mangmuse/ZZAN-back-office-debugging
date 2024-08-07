import { getCommentCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useCommentCountQuery = () => {
  return useQuery<Record<string, number>, Error>({
    queryKey: ["commentCount"],
    queryFn: () => getCommentCount()
  });
};

export default useCommentCountQuery;

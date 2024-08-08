import { getTodaySignUpCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useTodaySignUpCountQuery = () => {
  return useQuery<number, Error>({
    queryKey: ["todaySignUpCount"],
    queryFn: getTodaySignUpCount
  });
};

export default useTodaySignUpCountQuery;

import { getTodayKnowhowCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useTodayKnowhowCountQuery = () => {
  return useQuery<number, Error>({
    queryKey: ["todayKnowhowCount"],
    queryFn: getTodayKnowhowCount
  });
};

export default useTodayKnowhowCountQuery;

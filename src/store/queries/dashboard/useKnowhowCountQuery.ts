import { getKnowhowCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useKnowhowCountQuery = () => {
  return useQuery<Record<string, number>, Error>({
    queryKey: ["knowhowCount"],
    queryFn: getKnowhowCount
  });
};

export default useKnowhowCountQuery;

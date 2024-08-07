import { getSignUpCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useSignUpCountQuery = () => {
  return useQuery<Record<string, number>, Error>({
    queryKey: ["signUpCount"],
    queryFn: () => getSignUpCount()
  });
};

export default useSignUpCountQuery;

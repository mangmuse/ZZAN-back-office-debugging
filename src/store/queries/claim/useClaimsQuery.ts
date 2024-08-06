import { getClaims } from "@/apis/claim";
import { useQuery } from "@tanstack/react-query";

const useClaimsQuery = (page: number, pageNumber: number) => {
  return useQuery({
    queryKey: ["claims", { page, pageNumber }],
    queryFn: () => getClaims(page, pageNumber)
  });
};

export default useClaimsQuery;

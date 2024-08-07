import { getClaims } from "@/apis/claim";
import { TClaimsResponse } from "@/types/claim.type";
import { useQuery } from "@tanstack/react-query";

const useClaimsQuery = (page: number, pageNumber: number) => {
  return useQuery<TClaimsResponse, Error>({
    queryKey: ["claims", { page, pageNumber }],
    queryFn: () => getClaims(page, pageNumber)
  });
};

export default useClaimsQuery;

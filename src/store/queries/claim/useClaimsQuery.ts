import { getClaims } from "@/apis/claim";
import { TClaimsResponse } from "@/types/claim.type";
import { useQuery } from "@tanstack/react-query";

const useClaimsQuery = (
  page: number,
  limit: number,
  selectedSearchOption: string | undefined,
  searchKeyword: string | undefined
) => {
  return useQuery<TClaimsResponse, Error>({
    queryKey: ["claims", { page, limit, selectedSearchOption, searchKeyword }],
    queryFn: () => getClaims(page, limit, selectedSearchOption || "nickname", searchKeyword || "")
  });
};

export default useClaimsQuery;

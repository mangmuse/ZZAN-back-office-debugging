import { patchClaim } from "@/apis/claim";
import { CLAIM_PAGE_LIMIT } from "@/app/(main)/claim/_constant";
import { TStatusResponse } from "@/types";
import { TClaim } from "@/types/claim";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useClaimMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateClaim } = useMutation<TStatusResponse, Error, Partial<TClaim>>({
    mutationFn: (updatedVote) => patchClaim(updatedVote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["claims"]
      });
    }
  });
  return { updateClaim };
};
export default useClaimMutation;

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStatusResponse } from "@/types/index.type";
import { patchVote } from "@/apis/vote";
import { TVote } from "@/types/vote.type";

const useVoteMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: updateVote } = useMutation<TStatusResponse, Error, Partial<TVote>>({
    mutationFn: (updatedVote) => patchVote(updatedVote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["votes"]
      });
      router.push("/vote");
    }
  });

  return { updateVote };
};

export default useVoteMutation;

import { patchComment } from "@/apis/comment";
import { TCommentBlockReq } from "@/types/comment";
import { TStatusResponse } from "@/types/index.type";
import { displayErrorDialog } from "@/utils/sweetAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateCommentStatus } = useMutation<TStatusResponse, Error, TCommentBlockReq>({
    mutationFn: (updatedCommentStatus) => patchComment(updatedCommentStatus),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments"]
      })
  });

  return { updateCommentStatus };
};

export default useCommentMutation;

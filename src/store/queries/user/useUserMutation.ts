import { blockUser, patchUserPoint, unblockUser } from "@/apis/user";
import { TStatusResponse } from "@/types/index.type";
import { Tables } from "@/types/supabase";
import { TUserPointAction } from "@/types/user.type";
import { displayErrorDialog, displaySuccessDialog } from "@/utils/sweetAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserStatus } = useMutation<
    true | null,
    Error,
    { userId: Tables<"users">["userId"]; action: "block" | "unblock" }
  >({
    mutationFn: async ({ userId, action }) => {
      if (action === "block") {
        return await blockUser(userId);
      } else if (action === "unblock") {
        return await unblockUser(userId);
      }
    },
    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["user", { userId }]
      });
      const actionMessage = data ? "사용자가 제한되었습니다" : "사용자의 제한이 해제되었습니다";
      displaySuccessDialog(actionMessage);
      return data;
    },
    onError: (e) => displayErrorDialog("무언가 잘못되었어요!", e.message)
  });

  const { mutateAsync: updateUserPoint } = useMutation<TStatusResponse, Error, TUserPointAction>({
    mutationFn: (pointAction) => patchUserPoint(pointAction),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });
      const actionMessage = "포인트가 변경되었습니다.";
      displaySuccessDialog(actionMessage);
    },
    onError: (e) => displayErrorDialog("무언가 잘못되었어요!", e.message)
  });

  return { updateUserStatus, updateUserPoint };
};

export default useUserMutation;

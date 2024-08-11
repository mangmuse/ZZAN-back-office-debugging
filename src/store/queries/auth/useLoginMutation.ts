import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { displayErrorDialog } from "@/utils/sweetAlert";

export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: loginMutation } = useMutation<
    { accessToken: string; refreshToken: string },
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      return await logIn(email, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "auth"]
      });
      router.push("/");
    },
    onError: (error) => {
      displayErrorDialog("로그인 실패", error.message || "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  });

  return { loginMutation };
}

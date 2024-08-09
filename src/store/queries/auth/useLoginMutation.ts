import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn } from "@/apis/auth";
import { useRouter } from "next/navigation";

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
      console.error("로그인 중 오류 발생:", error);
    }
  });

  return { loginMutation };
}

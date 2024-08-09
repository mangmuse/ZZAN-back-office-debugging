import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "@/apis/auth";
import { useRouter } from "next/navigation";

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: logoutMutation } = useMutation<void, Error>({
    mutationFn: async () => {
      return await logOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "auth"]
      });
      router.push("/login");
    },
    onError: (error) => {
      console.error("로그아웃 중 오류 발생:", error);
    }
  });

  return { logoutMutation };
}

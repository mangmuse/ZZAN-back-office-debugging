import { getUser, getUsers } from "@/apis/user";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const useUserQuery = (userId: string) => {
  return useQuery<true | null, Error, Tables<"users">["userId"]>({
    queryKey: ["user", { userId }],
    queryFn: () => getUser(userId)
  });
};

export default useUserQuery;

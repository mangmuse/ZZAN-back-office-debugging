import { getUsers } from "@/apis/user";
import { TUsersResponse } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

const useUsersQuery = (page: number, pageNumber: number) => {
  return useQuery<TUsersResponse, Error>({
    queryKey: ["users", { page, pageNumber }],
    queryFn: () => getUsers(page, pageNumber)
  });
};

export default useUsersQuery;

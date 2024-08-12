import { getUsers } from "@/apis/user";
import { TUsersResponse } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

const useUsersQuery = (
  page: number,
  pageNumber: number,
  selectedSearchOption: string | undefined,
  searchKeyword: string = ""
) => {
  return useQuery<TUsersResponse, Error>({
    queryKey: ["users", { page, pageNumber, selectedSearchOption, searchKeyword }],
    queryFn: () => getUsers(page, pageNumber, selectedSearchOption, searchKeyword)
  });
};

export default useUsersQuery;

"use client";

import TableContainer from "@/components/TableContainer";
import useUsersQuery from "@/store/queries/user/useUsersQuery";
import { USER_PAGE_LIMIT, USER_SELECT_ITEMS } from "@/app/(main)/user/constant";
import { TUser } from "@/types/user.type";
import UserItem from "@/app/(main)/user/_components/UserItem";

const userHeaders = ["ID", "Email", "닉네임", "Provider", "Total Point", "Current Point", "Role", ""];
const query = useUsersQuery;
function UserContainer() {
  return (
    <TableContainer<TUser>
      useQuery={query}
      renderRow={(user: TUser) => <UserItem key={user.userId} user={user} />}
      headers={userHeaders}
      pageLimit={USER_PAGE_LIMIT}
      searchOptions={USER_SELECT_ITEMS}
    />
  );
}

export default UserContainer;

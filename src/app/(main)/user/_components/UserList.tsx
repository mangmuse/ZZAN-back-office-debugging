import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";
import UserItem from "@/app/(main)/user/_components/UserItem";
import { TUser } from "@/types/user.type";

type UserListProps = {
  users: TUser[];
};

function UserList({ users }: UserListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>닉네임</TableHeaderCell>
            <TableHeaderCell>Provider</TableHeaderCell>
            <TableHeaderCell>Total Point</TableHeaderCell>
            <TableHeaderCell>Current Point</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserItem key={user.userId} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

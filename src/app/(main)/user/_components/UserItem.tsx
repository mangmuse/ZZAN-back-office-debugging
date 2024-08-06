import { TUser } from "@/types/user.type";
import { TableCell, TableRow } from "@/components/ui/table";

type UserItemProps = {
  user: TUser;
};

function UserItem({ user }: UserItemProps) {
  return (
    <TableRow className="text-center">
      <TableCell>{user.userId}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.nickname}</TableCell>
      <TableCell>{user.provider}</TableCell>
      <TableCell>{user.total_point}</TableCell>
      <TableCell>{user.current_point}</TableCell>
      <TableCell> - </TableCell>
    </TableRow>
  );
}

export default UserItem;

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useClaimMutation from "@/store/queries/claim/useClaimMutation";
import { TClaim } from "@/types/claim.type";
import { formatTime } from "@/utils/formatNumber";
import { MouseEventHandler } from "react";

function ClaimItem({ claim }: { claim: TClaim }) {
  const { formattedDate, formattedTime } = formatTime(claim.created_at);
  const sentAtFormatted = claim.sent_at ? formatTime(claim.sent_at) : { formattedDate: "-", formattedTime: "-" };
  const { formattedDate: sentAtDate, formattedTime: sentAtTime } = sentAtFormatted;
  const { updateClaim } = useClaimMutation();

  const handleChangeIsSent: MouseEventHandler<HTMLButtonElement> = async () => {
    const { nickname, email, gift_name, ...rest } = claim;
    const updatedClaim: Partial<TClaim> = {
      ...rest,
      is_sent: !claim.is_sent
    };
    await updateClaim(updatedClaim);
  };

  return (
    <TableRow className="text-center">
      <TableCell>{claim.user_id}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{formattedTime}</TableCell>
      <TableCell>{claim.nickname}</TableCell>
      <TableCell>{claim.email}</TableCell>
      <TableCell>{claim.gift_name}</TableCell>
      <TableCell>{claim.is_sent ? "완료" : "대기중"}</TableCell>
      <TableCell>{sentAtDate}</TableCell>
      <TableCell>{sentAtTime}</TableCell>
      <TableCell>
        <Button onClick={handleChangeIsSent} size={"sm"} variant={"destructive"}>
          상태 바꾸는 버튼
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ClaimItem;

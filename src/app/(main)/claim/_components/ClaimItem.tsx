import { Button } from "@/components/ui/button";
import useClaimMutation from "@/store/queries/claim/useClaimMutation";
import { TClaim } from "@/types/claim";
import { formatTime } from "@/utils/formatNumber";
import { MouseEventHandler } from "react";

function ClaimItem({ claim }: { claim: TClaim }) {
  const { formattedDate, formattedTime } = formatTime(claim.created_at);
  const sentAtFormatted = claim.sent_at ? formatTime(claim.sent_at) : { formattedDate: "", formattedTime: "" };
  const { formattedDate: sentAtDate, formattedTime: sentAtTime } = sentAtFormatted;
  const { updateClaim } = useClaimMutation();

  const handleChangeIsSent: MouseEventHandler<HTMLButtonElement> = async () => {
    const { nickname, email, gift_name, ...rest } = claim;
    const updatedClaim: Partial<TClaim> = {
      ...rest,
      is_sent: !claim.is_sent
    };
    console.log(updatedClaim);
    await updateClaim(updatedClaim);
  };

  return (
    <li className="flex gap-1">
      <span>{formattedDate}</span>
      <span>{formattedTime}</span>
      <span>{claim.nickname}</span>
      <span>{claim.email}</span>
      <span>{claim.gift_name}</span>
      <span>{claim.is_sent ? "완료" : "대기중"}</span>
      <span>{sentAtDate}</span>
      <span>{sentAtTime}</span>
      <Button onClick={handleChangeIsSent} size={"sm"} variant={"destructive"}>
        상태 바꾸는 버튼
      </Button>
    </li>
  );
}

export default ClaimItem;

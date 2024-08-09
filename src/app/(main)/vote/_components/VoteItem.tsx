import { useState } from "react";
import Link from "next/link";
import ModalDialog from "@/components/ModalDialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useVoteMutation from "@/store/queries/vote/useVoteMutation";
import { formatTime } from "@/utils/formatNumber";
import { TVote } from "@/types/vote.type";

function VoteItem({ vote }: { vote: TVote }) {
  const { formattedDate } = formatTime(vote.created_at);

  const { updateVote } = useVoteMutation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isBanned, setIsBanned] = useState(vote.is_banned);

  const voteUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/votes/${vote.vote_postId}`;

  const handleToggleBanPost = async () => {
    setConfirmOpen(false);

    try {
      await updateVote({
        vote_postId: vote.vote_postId,
        is_banned: !isBanned
      });
      setIsBanned(!isBanned);
      setAlertMessage(!isBanned ? "게시 중지가 성공적으로 처리되었습니다." : "재게시가 성공적으로 처리되었습니다.");
      setAlertOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(`오류 발생: ${error.message}`);
        setAlertOpen(true);
      }
    }
  };

  const handleConfirm = () => {
    setConfirmOpen(true);
  };

  const confirmCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <TableRow className="text-center">
        <TableCell>{vote.vote_postId}</TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>
          <Link href={voteUrl} target="_blank" rel="noopener noreferrer">
            <span className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer">
              {vote.title}
            </span>
          </Link>
        </TableCell>
        <TableCell>{vote.users.nickname}</TableCell>
        <TableCell>
          <Button onClick={handleConfirm} variant={isBanned ? "secondary" : "destructive"}>
            {isBanned ? "재게시" : "게시 중지"}
          </Button>
        </TableCell>
      </TableRow>

      <ModalDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="알림"
        message={alertMessage}
        type="alert"
        onConfirm={() => setAlertOpen(false)}
      />
      <ModalDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={isBanned ? "재게시 처리" : "게시 중지 처리"}
        message={isBanned ? "정말 재게시 처리 하시겠습니까?" : "정말 게시 중지 처리 하시겠습니까?"}
        type="confirm"
        onConfirm={handleToggleBanPost}
        onCancel={confirmCancel}
      />
    </>
  );
}

export default VoteItem;

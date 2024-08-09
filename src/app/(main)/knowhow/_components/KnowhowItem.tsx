import { useState } from "react";
import Link from "next/link";
import ModalDialog from "@/components/ModalDialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useKnowhowMutation from "@/store/queries/knowhow/useKnowhowMutation";
import { formatTime } from "@/utils/formatNumber";
import { TKnowhow } from "@/types/knowhow.type";

function KnowhowItem({ knowhow }: { knowhow: TKnowhow }) {
  const { formattedDate } = formatTime(knowhow.created_at);

  const { updateKnowhow } = useKnowhowMutation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isBanned, setIsBanned] = useState(knowhow.is_banned);

  const knowhowUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/knowhow/${knowhow.knowhow_postId}`;

  const handleToggleBanPost = async () => {
    setConfirmOpen(false);

    try {
      await updateKnowhow({
        knowhow_postId: knowhow.knowhow_postId,
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
        <TableCell>{knowhow.knowhow_postId}</TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>
          <Link href={knowhowUrl} target="_blank" rel="noopener noreferrer">
            <span className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer">
              {knowhow.title}
            </span>
          </Link>
        </TableCell>
        <TableCell>{knowhow.users.nickname}</TableCell>
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

export default KnowhowItem;

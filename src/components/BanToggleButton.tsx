import { useState } from "react";
import { Button } from "@/components/ui/button";
import ModalDialog from "@/components/ModalDialog";

type BanToggleButtonProps = {
  isBanned: boolean;
  onToggleBan: (newBanStatus: boolean) => Promise<void>;
};

const BanToggleButton = ({ isBanned, onToggleBan }: BanToggleButtonProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(true);
  };

  const confirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleToggleBanPost = async () => {
    setConfirmOpen(false);
    try {
      await onToggleBan(!isBanned);
      setAlertMessage(!isBanned ? "게시 중지가 성공적으로 처리되었습니다." : "재게시가 성공적으로 처리되었습니다.");
      setAlertOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(`오류 발생: ${error.message}`);
        setAlertOpen(true);
      }
    }
  };

  return (
    <>
      <Button onClick={handleConfirm} variant={isBanned ? "secondary" : "destructive"}>
        {isBanned ? "재게시" : "게시 중지"}
      </Button>

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
};

export default BanToggleButton;

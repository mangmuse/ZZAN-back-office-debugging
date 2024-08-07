import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";

type ModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  type: "confirm" | "alert";
  onConfirm: () => void;
  onCancel?: () => void;
};

function ModalDialog({ open, onOpenChange, type, title, message, onConfirm, onCancel }: ModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === "confirm" && <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ModalDialog;

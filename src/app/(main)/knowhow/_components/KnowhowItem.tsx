import { useState } from "react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import useKnowhowMutation from "@/store/queries/knowhow/useKnowhowMutation";
import { formatTime } from "@/utils/formatNumber";
import BanToggleButton from "@/components/BanToggleButton";
import { TKnowhow } from "@/types/knowhow.type";

function KnowhowItem({ knowhow }: { knowhow: TKnowhow }) {
  const { formattedDate } = formatTime(knowhow.created_at);

  const { updateKnowhow } = useKnowhowMutation();
  const [isBanned, setIsBanned] = useState(knowhow.is_banned);

  const knowhowUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/knowhow/${knowhow.knowhow_postId}`;

  const handleToggleBan = async (newBanStatus: boolean) => {
    await updateKnowhow({
      knowhow_postId: knowhow.knowhow_postId,
      is_banned: newBanStatus
    });
    setIsBanned(newBanStatus);
  };
  return (
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
        <BanToggleButton isBanned={isBanned} onToggleBan={handleToggleBan} />
      </TableCell>
    </TableRow>
  );
}

export default KnowhowItem;

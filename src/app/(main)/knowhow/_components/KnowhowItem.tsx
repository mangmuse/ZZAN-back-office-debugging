import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { TKnowhow } from "@/types/knowhow.type";
import { formatTime } from "@/utils/formatNumber";
import Link from "next/link";

function KnowhowItem({ knowhow }: { knowhow: TKnowhow }) {
  const { formattedDate } = formatTime(knowhow.created_at);

  const knowhowUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/knowhow/${knowhow.knowhow_postId}`;

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
        <Button variant={"destructive"}>게시 중지</Button>
      </TableCell>
    </TableRow>
  );
}

export default KnowhowItem;

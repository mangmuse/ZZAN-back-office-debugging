import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { TVote } from "@/types/vote.type";
import { formatTime } from "@/utils/formatNumber";
import Link from "next/link";

function VoteItem({ vote }: { vote: TVote }) {
  const { formattedDate } = formatTime(vote.created_at);

  const voteUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/votes/${vote.vote_postId}`;

  return (
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
        <Button variant={"destructive"}>게시 중지</Button>
      </TableCell>
    </TableRow>
  );
}

export default VoteItem;

import { useState } from "react";
import { createPortal } from "react-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { TComment } from "@/types/comment";
import CommentTooltip from "@/app/(main)/comment/_components/CommentTooltip";
import Link from "next/link";
import { ZZAN_BASE_URL } from "@/constants";
import { formatTime } from "@/utils/formatNumber";
import BanToggleButton from "@/components/BanToggleButton";
import useCommentMutation from "@/store/queries/comment/useCommentMutation";

function CommentItem({ comment }: { comment: TComment }) {
  const { updateCommentStatus } = useCommentMutation();
  const { formattedDate, formattedTime } = formatTime(comment.created_at);
  const isKnowhow = comment.type === "knowhow";
  const postURL = `${ZZAN_BASE_URL}/boards/${isKnowhow ? "knowhow" : "votes"}/${comment.post_id}`;

  const handleToggleBan = async (newBanStatus: boolean) => {
    await updateCommentStatus({
      comment_id: comment.comment_id,
      type: comment.type,
      is_banned: newBanStatus
    });
  };
  return (
    <TableRow className=" text-center">
      <TableCell>{comment.comment_id}</TableCell>

      <TableCell>
        <Link
          href={postURL}
          className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {comment.post_id}
        </Link>
      </TableCell>
      <TableCell>{comment.type}</TableCell>

      <TableCell>{formattedDate}</TableCell>
      <TableCell>{formattedTime}</TableCell>
      <TableCell>{comment.nickname}</TableCell>

      <TableCell className="truncate max-w-3xl">
        <CommentTooltip content={comment.content}>
          <div className="truncate cursor-pointer">{comment.content}</div>
        </CommentTooltip>
      </TableCell>

      <TableCell>{comment.is_banned ? "중지됨" : "게시됨"}</TableCell>
      <TableCell>
        <BanToggleButton isBanned={comment.is_banned} onToggleBan={handleToggleBan} />
      </TableCell>
    </TableRow>
  );
}

export default CommentItem;

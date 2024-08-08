import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";
import VoteItem from "@/app/(main)/vote/_components/VoteItem";
import { TVote } from "@/types/vote.type";

type VoteListProps = {
  votes: TVote[];
};

function VoteList({ votes }: VoteListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeaderCell>짠 소비 아이디</TableHeaderCell>
            <TableHeaderCell>작성 일시</TableHeaderCell>
            <TableHeaderCell>제목</TableHeaderCell>
            <TableHeaderCell>작성자 닉네임</TableHeaderCell>
            <TableHeaderCell>게시 중지</TableHeaderCell>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {votes.map((vote) => (
            <VoteItem key={vote.vote_postId} vote={vote} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VoteList;

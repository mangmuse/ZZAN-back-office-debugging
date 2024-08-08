import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";
import KnowhowItem from "@/app/(main)/knowhow/_components/KnowhowItem";
import { TKnowhow } from "@/types/knowhow.type";

type KnowhowListProps = {
  knowhows: TKnowhow[];
};

function KnowhowList({ knowhows }: KnowhowListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeaderCell>짠 노하우 아이디</TableHeaderCell>
            <TableHeaderCell>작성 일시</TableHeaderCell>
            <TableHeaderCell>제목</TableHeaderCell>
            <TableHeaderCell>작성자 닉네임</TableHeaderCell>
            <TableHeaderCell>게시 중지</TableHeaderCell>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {knowhows.map((knowhow) => (
            <KnowhowItem key={knowhow.knowhow_postId} knowhow={knowhow} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KnowhowList;

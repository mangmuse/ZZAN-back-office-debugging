import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";
import QuizItem from "@/app/(main)/quiz/_components/QuizItem";
import { TQuiz } from "@/types/quiz";

type QuizListProps = {
  quizzes: TQuiz[];
};

function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeaderCell>퀴즈 아이디</TableHeaderCell>
            <TableHeaderCell>발행일자</TableHeaderCell>
            <TableHeaderCell>문제</TableHeaderCell>
            <TableHeaderCell>해설</TableHeaderCell>
            <TableHeaderCell>정답</TableHeaderCell>
            <TableHeaderCell>수정</TableHeaderCell>
            <TableHeaderCell>삭제</TableHeaderCell>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {quizzes.map((quiz) => (
            <QuizItem key={quiz.quizId} quiz={quiz} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizList;

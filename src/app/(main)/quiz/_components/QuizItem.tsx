import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { TQuiz } from "@/types/quiz";
import { formatTime } from "@/utils/formatNumber";

function QuizItem({ quiz }: { quiz: TQuiz }) {
  const { formattedDate } = formatTime(quiz.issue_date);

  return (
    <TableRow className="text-center">
      <TableCell>{quiz.quizId}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{quiz.question}</TableCell>
      <TableCell>{quiz.explanation}</TableCell>
      <TableCell>{quiz.is_correct ? "O" : "X"}</TableCell>
      <TableCell>
        <Button className="bg-blue-500">수정</Button>
      </TableCell>
      <TableCell>
        <Button className="bg-red-500">삭제</Button>
      </TableCell>
    </TableRow>
  );
}

export default QuizItem;

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { TQuiz } from "@/types/quiz";
import { formatTime } from "@/utils/formatNumber";
import { useRouter } from "next/navigation";

function QuizItem({ quiz }: { quiz: TQuiz }) {
  const router = useRouter();

  const { formattedDate } = formatTime(quiz.issue_date);

  const handleNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <TableRow className="text-center">
      <TableCell>{quiz.quizId}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{quiz.question}</TableCell>
      <TableCell>{quiz.explanation}</TableCell>
      <TableCell>{quiz.is_correct ? "O" : "X"}</TableCell>
      <TableCell>
        <Button onClick={() => handleNavigate(`/quiz/edit/${quiz.quizId}`)} variant={"secondary"}>
          수정
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default QuizItem;

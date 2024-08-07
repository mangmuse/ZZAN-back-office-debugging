import { getQuiz } from "@/apis/quiz";
import QuizWriteForm from "@/app/(main)/quiz/_components/QuizWriteForm";

async function QuizEditPage({ params: { quizId } }: { params: { quizId: number } }) {
  const quiz = await getQuiz(quizId);

  return <QuizWriteForm previousContent={quiz} />;
}

export default QuizEditPage;

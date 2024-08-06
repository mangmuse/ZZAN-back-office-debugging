import { getQuizzes } from "@/apis/quiz";
import { useQuery } from "@tanstack/react-query";

const useQuizzesQuery = (page: number, pageNumber: number) => {
  return useQuery({
    queryKey: ["quizzes", { page, pageNumber }],
    queryFn: () => getQuizzes(page, pageNumber)
  });
};

export default useQuizzesQuery;

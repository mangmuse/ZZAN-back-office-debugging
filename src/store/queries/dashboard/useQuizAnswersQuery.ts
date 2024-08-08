import { getQuizAnswers } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

type TQuizAnswersResponse = {
  date: string;
  correct: number;
  incorrect: number;
};

const useQuizAnswersQuery = (date: string) => {
  return useQuery<TQuizAnswersResponse, Error, string>({
    queryKey: ["quizAnswers", { date }],
    queryFn: () => getQuizAnswers(date)
  });
};

export default useQuizAnswersQuery;

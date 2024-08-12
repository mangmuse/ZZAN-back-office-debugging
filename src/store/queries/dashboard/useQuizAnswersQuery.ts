import { getQuizAnswers } from "@/apis/dashboard";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export type TQuizAnswersResponse = {
  date: string;
  correct: number;
  incorrect: number;
};

const useQuizAnswersQuery = (date: string): UseQueryResult<TQuizAnswersResponse, Error> => {
  return useQuery<TQuizAnswersResponse, Error>({
    queryKey: ["quizAnswers", date],
    queryFn: () => getQuizAnswers(date)
  });
};

export default useQuizAnswersQuery;

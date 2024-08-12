import { TQuiz, TQuizzesResponse } from "@/types/quiz.type";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQuiz, patchQuiz } from "@/apis/quiz";
import { TStatusResponse } from "@/types/index.type";

const useQuizMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: addQuiz } = useMutation<TQuizzesResponse, Error, Partial<Tables<"quizzes">>>({
    mutationFn: (newVote) => postQuiz(newVote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizzes"]
      });
      router.push("/quiz");
    }
  });

  const { mutateAsync: updateQuiz } = useMutation<TStatusResponse, Error, Partial<TQuiz>>({
    mutationFn: (updatedQuiz) => patchQuiz(updatedQuiz),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizzes"]
      });
      router.push("/quiz");
    }
  });

  return { addQuiz, updateQuiz };
};

export default useQuizMutation;

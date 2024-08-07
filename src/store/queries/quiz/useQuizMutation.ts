import { TQuizzesResponse } from "@/types/quiz";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQuiz } from "@/apis/quiz";

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

  return { addQuiz };
};

export default useQuizMutation;

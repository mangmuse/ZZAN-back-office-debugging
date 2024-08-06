import { Tables } from "@/types/supabase";

export type TQuiz = Tables<"quizzes">;

export type TQuizzesResponse = {
  data: TQuiz[];
  totalPages: number;
};

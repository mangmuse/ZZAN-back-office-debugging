import { BASE_URL } from "@/constants";
import { Tables } from "@/types/supabase";

export const getQuizzes = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/quiz?page=${page}&limit=${limit}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const postQuiz = async (newQuiz: Partial<Tables<"quizzes">>) => {
  const res = await fetch(`${BASE_URL}/api/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newQuiz)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "퀴즈 등록에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const quizzes = await res.json();
  return quizzes;
};

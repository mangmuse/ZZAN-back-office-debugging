import { BASE_URL } from "@/constants";

export const getQuizzes = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/quiz?page=${page}&limit=${limit}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

import { BASE_URL } from "@/constants";
import { TVote } from "@/types/vote.type";

export const getVotes = async (page: number, limit: number, selectedSearchOption: string, searchKeyword: string) => {
  const res = await fetch(
    `${BASE_URL}/api/vote?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
};

export const patchVote = async (vote: Partial<TVote>) => {
  console.log("patch vote");
  const res = await fetch(`${BASE_URL}/api/vote/${vote.vote_postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vote)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "짠 소비 게시글 규제 처리에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

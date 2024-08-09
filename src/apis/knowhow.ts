import { BASE_URL } from "@/constants";
import { TKnowhow } from "@/types/knowhow.type";

export const getKnowhows = async (page: number, limit: number, selectedSearchOption: string, searchKeyword: string) => {
  const res = await fetch(
    `${BASE_URL}/api/knowhow?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
};

export const patchKnowhow = async (knowhow: Partial<TKnowhow>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhow.knowhow_postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(knowhow)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "짠 노하우 게시글 규제 처리에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

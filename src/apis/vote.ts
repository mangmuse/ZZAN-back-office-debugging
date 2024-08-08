import { BASE_URL } from "@/constants";

export const getVotes = async (page: number, limit: number, selectedSearchOption: string, searchKeyword: string) => {
  const res = await fetch(
    `${BASE_URL}/api/vote?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
};

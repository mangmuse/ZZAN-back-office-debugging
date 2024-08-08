import { BASE_URL } from "@/constants";

export const getKnowhows = async (page: number, limit: number, selectedSearchOption: string, searchKeyword: string) => {
  const res = await fetch(
    `${BASE_URL}/api/knowhow?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
};

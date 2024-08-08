import { BASE_URL } from "@/constants";

export const getKnowhows = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/knowhow?page=${page}&limit=${limit}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

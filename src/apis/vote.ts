import { BASE_URL } from "@/constants";

export const getVotes = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/vote?page=${page}&limit=${limit}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

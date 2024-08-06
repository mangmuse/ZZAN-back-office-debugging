import { BASE_URL } from "@/constants";

export const getUsers = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/user?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

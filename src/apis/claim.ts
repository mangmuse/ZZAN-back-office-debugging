import { BASE_URL } from "@/constants";
import { TClaim } from "@/types/claim.type";

export const getClaims = async (page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/claim?page=${page}&limit=${limit}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

export const patchClaim = async (claim: Partial<TClaim>) => {
  const res = await fetch(`${BASE_URL}/api/claim`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(claim)
  });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

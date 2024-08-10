import { BASE_URL } from "@/constants";
import { TClaim } from "@/types/claim.type";

export const getClaims = async (
  page: number = 1,
  limit: number = 10,
  selectedSearchOption: string = "nickname",
  searchKeyword: string = ""
) => {
  const res = await fetch(
    `${BASE_URL}/api/claim?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`,
    { cache: "no-store" }
  );
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

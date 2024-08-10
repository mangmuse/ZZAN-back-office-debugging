import { BASE_URL } from "@/constants";
import { Tables } from "@/types/supabase";
import { TUserPointAction } from "@/types/user.type";

export const getUsers = async (
  page: number,
  limit: number,
  selectedSearchOption: string = "nickname",
  searchKeyword: string
) => {
  const res = await fetch(
    `${BASE_URL}/api/user?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`
  );
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

export const getUser = async (userId: Tables<"users">["userId"]) => {
  const res = await fetch(`${BASE_URL}/api/user/block/${userId}`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

export const blockUser = async (userId: Tables<"users">["userId"]) => {
  const res = await fetch(`${BASE_URL}/api/user/block/${userId}`, {
    method: "PATCH"
  });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

export const unblockUser = async (userId: Tables<"users">["userId"]) => {
  const res = await fetch(`${BASE_URL}/api/user/unblock/${userId}`, {
    method: "PATCH"
  });
  console.log(res);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};
export const patchUserPoint = async (pointAction: TUserPointAction) => {
  console.log(pointAction);
  const res = await fetch(`${BASE_URL}/api/user/point/${pointAction.userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pointAction)
  });
  console.log(res);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

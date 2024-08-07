import { BASE_URL } from "@/constants";

export const getSignUpCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/signup`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

export const getTodaySignUpCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/today/signup`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

export const getKnowhowCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/knowhow`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};
export const getVoteCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/vote`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};
export const getCommentCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/comment`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  console.log(data);
  return data;
};

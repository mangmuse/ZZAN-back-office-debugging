import { BASE_URL } from "@/constants";

export const getSignUpCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/signup`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const getKnowhowCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/knowhow`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};
export const getVoteCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/vote`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};
export const getCommentCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/comment`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const getQuizAnswers = async (date: string) => {
  const res = await fetch(`${BASE_URL}/api/dashboard/quiz?date=${date}`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const getTodaySignUpCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/today/signup`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};
export const getTodayKnowhowCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/today/knowhow`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};
export const getTodayVoteCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/today/vote`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};
export const getTodayCommentCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/today/comment`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const getCumulativeSignupCount = async () => {
  const res = await fetch(`${BASE_URL}/api/dashboard/cumulative/signup`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

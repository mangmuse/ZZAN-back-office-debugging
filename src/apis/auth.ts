import { BASE_URL } from "@/constants";

export const logIn = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "로그인에 실패했습니다.";
    throw new Error(errorMessage);
  }
  return res.json();
};

export const logOut = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "로그아웃에 실패했습니다.";
    throw new Error(errorMessage);
  }
  return res.json();
};

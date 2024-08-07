import { Tables } from "@/types/supabase";

export type TUser = Tables<"users">;

export type TUsersResponse = {
  data: TUser[];
  totalPages: number;
};

export type TUserPointAction = {
  userId: Tables<"users">["userId"];
  points: number;
  reason: string;
};

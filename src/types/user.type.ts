import { Tables } from "@/types/supabase";

export type TUser = Tables<"users">;

export type TUsersResponse = {
  data: TUser[];
  totalPages: number;
};

import { Tables } from "@/types/supabase";

export type TClaim = Tables<"gift_claims"> & {
  email: string;
  nickname: string;
  gift_name: string;
};

export type TClaimsResponse = {
  data: TClaim[];
  totalPages: number;
};

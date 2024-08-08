import { Tables } from "@/types/supabase";

export type TVotesResponse = {
  data: TVote[];
};

export type TVote = Tables<"vote_posts"> & {
  users: {
    nickname: string;
  };
};

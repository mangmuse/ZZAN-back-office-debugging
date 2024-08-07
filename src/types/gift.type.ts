import { Tables } from "@/types/supabase";

export type TNewGift = Partial<Tables<"gifts">> & {
  img_file: File | null;
};

export type TGiftCategory = "cvs" | "movie" | "car" | "beauty" | "icecream" | "c&p" | "drink";

export type TFormData = {
  giftId?: number;
  gift_name: string;
  point: string;
  category: TGiftCategory | "";
  brand_name: string;
  img_file: File | null;
};

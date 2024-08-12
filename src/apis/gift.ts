import { BASE_URL } from "@/constants";
import { TNewGift } from "@/types/gift.type";
import { Tables } from "@/types/supabase";
import { revalidatePath } from "next/cache";

export const getGifts = async () => {
  const res = await fetch(`${BASE_URL}/api/gift`);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const getGift = async (giftId: number) => {
  revalidatePath("/", "layout");
  const res = await fetch(`${BASE_URL}/api/gift/${giftId}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

export const postGift = async (newGift: TNewGift) => {
  const formData = new FormData();

  if (newGift.gift_name) formData.append("gift_name", newGift.gift_name);
  if (newGift.point !== undefined) formData.append("point", newGift.point.toString());
  if (newGift.category) formData.append("category", newGift.category);
  if (newGift.brand_name) formData.append("brand_name", newGift.brand_name);
  if (newGift.img_file) formData.append("img_file", newGift.img_file);

  const res = await fetch(`${BASE_URL}/api/gift`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error();
  }

  const data = await res.json();
  return data;
};

export const patchGift = async (newGift: TNewGift) => {
  const formData = new FormData();
  if (newGift.giftId) formData.append("giftId", newGift.giftId.toString());
  if (newGift.gift_name) formData.append("gift_name", newGift.gift_name);
  if (newGift.point !== undefined) formData.append("point", newGift.point.toString());
  if (newGift.category) formData.append("category", newGift.category);
  if (newGift.brand_name) formData.append("brand_name", newGift.brand_name);
  if (newGift.img_file) formData.append("img_file", newGift.img_file);
  const res = await fetch(`${BASE_URL}/api/gift/${newGift.giftId}`, {
    method: "PATCH",
    body: formData
  });

  if (!res.ok) {
    throw new Error();
  }

  const data = await res.json();
  return data;
};

export const deleteGift = async (giftId: number) => {
  const res = await fetch(`${BASE_URL}/api/gift/${giftId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

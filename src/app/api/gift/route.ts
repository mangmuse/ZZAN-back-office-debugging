import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { STORAGE_BASE_URL } from "@/constants";
import { uploadFileToSupabase } from "@/utils/uploadImage";

export const GET = async () => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("gifts").select("*").order("created_at");
    if (error) {
      throw new Error("기프티콘 목록을 가져오지 못했습니다");
    }
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  try {
    const formData = await req.formData();
    const giftName = formData.get("gift_name") as string;
    const point = formData.get("point") as string;
    const category = formData.get("category") as string;
    const brandName = formData.get("brand_name") as string;
    const imgFile = formData.get("img_file") as File;

    console.log({ giftName, point, category, brandName, imgFile });

    const bucketName = "gifts";
    const fileName = `${category}/${crypto.randomUUID()}-${imgFile.name}`;

    const { data, error } = await uploadFileToSupabase(supabase, bucketName, fileName, imgFile);

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    const img_url = `${STORAGE_BASE_URL}/${data.fullPath}`;
    const newGift = {
      gift_name: giftName,
      point: Number(point),
      category,
      brand_name: brandName,
      img_url
    };
    const { status, statusText } = await supabase.from("gifts").insert([newGift]);

    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

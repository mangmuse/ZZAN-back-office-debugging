import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();
  const { knowhow_postId, is_banned } = await req.json();

  if (typeof knowhow_postId !== "number" || typeof is_banned !== "boolean") {
    return NextResponse.json({ error: "잘못된 데이터 형식입니다." }, { status: 400 });
  }

  try {
    const { status, statusText } = await supabase
      .from("knowhow_posts")
      .update({ is_banned })
      .eq("knowhow_postId", knowhow_postId)
      .single();

    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

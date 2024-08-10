import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const { data, error } = await supabase
      .from("knowhow_posts")
      .select("created_at")
      .gte("created_at", startOfDay)
      .lte("created_at", endOfDay);

    if (error) {
      throw new Error("노하우 목록을 받아오지 못했습니다");
    }

    const knowhowCount = data ? data.length : 0;

    return NextResponse.json(knowhowCount);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

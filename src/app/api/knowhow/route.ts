import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  try {
    const { data, error, count } = await supabase
      .from("knowhow_posts")
      .select("*, users(nickname)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error("짠 노하우 게시글 목록을 가져오지 못했습니다.");
    }

    revalidatePath("/", "layout");
    if (count) {
      const totalPages = Math.ceil(count / limit);
      return NextResponse.json({ data, totalPages });
    }
  } catch (e) {
    console.error("Unexpected error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
};

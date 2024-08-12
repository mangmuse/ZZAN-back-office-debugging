import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const selectedSearchOption = searchParams.get("searchOption");
  const searchKeyword = searchParams.get("search") || "";

  try {
    let query = supabase
      .from("vote_posts")
      .select("*, users!inner(nickname)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (searchKeyword) {
      if (selectedSearchOption === "titleContent") {
        query = query.or(`title.ilike.%${searchKeyword}%,content.ilike.%${searchKeyword}%`);
      } else if (selectedSearchOption === "nickname") {
        query = query.filter("users.nickname", "ilike", `%${searchKeyword}%`);
      }
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error("짠 소비 평가 게시글 목록을 가져오지 못했습니다.");
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "해당 데이터가 존재하지 않습니다.", data: [], totalPages: 0 },
        { status: 404 }
      );
    }

    revalidatePath("/", "layout");

    if (count) {
      const totalPages = Math.ceil(count / limit);
      return NextResponse.json({ data, totalPages });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
};

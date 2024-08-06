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
    const {
      data: users,
      error,
      count
    } = await supabase
      .from("users")
      .select(
        `
        *
      `,
        { count: "exact" }
      )
      .order("total_point", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.log(error);
      throw new Error("유저 목록을 받아오지 못했습니다");
    }
    console.log(users);
    console.log("asd");
    if (count) {
      const totalPages = Math.ceil(count / limit);
      return NextResponse.json({ data: users, totalPages });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

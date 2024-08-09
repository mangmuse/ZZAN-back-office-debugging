import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params: { commentId } }: { params: { commentId: string } }) => {
  const supabase = createClient();
  const { type, is_banned } = await req.json();

  if (typeof commentId !== "string" || typeof is_banned !== "boolean") {
    return NextResponse.json({ error: "잘못된 데이터 형식입니다." }, { status: 400 });
  }

  const commentTable = type === "knowhow" ? "knowhow_comments" : "vote_comments";
  const commentIdColumn = type === "knowhow" ? "knowhow_commentId" : "vote_commentId";
  console.log(commentTable, commentIdColumn);
  try {
    const { status, statusText } = await supabase
      .from(commentTable)
      .update({ is_banned })
      .eq(commentIdColumn, commentId)
      .single();
    console.log(status, statusText);
    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

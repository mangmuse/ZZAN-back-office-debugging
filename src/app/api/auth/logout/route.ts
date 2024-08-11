import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 중 오류 발생:", error);
      return NextResponse.json({ error: "로그아웃 중 오류가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json({ message: "성공적으로 로그아웃되었습니다." });
  } catch (e) {
    if (e instanceof Error) {
      console.error("알 수 없는 오류 발생:", e.message);
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 오류가 발생했습니다." }, { status: 500 });
    }
  }
}

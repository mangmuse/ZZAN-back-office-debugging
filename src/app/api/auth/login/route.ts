import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const supabase = createClient();

    const { data: user, error: userError } = await supabase.from("users").select("role").eq("email", email).single();

    if (userError || !user) {
      console.error("사용자 정보 조회 중 오류 발생 또는 사용자 없음:", userError);
      return NextResponse.json({ error: "이메일 또는 비밀번호가 잘못되었습니다." }, { status: 401 });
    }

    if (user.role !== "admin") {
      console.warn("비인가 사용자 접근 시도:", email);
      return NextResponse.json({ error: "관리자 계정만 접근할 수 있습니다." }, { status: 403 });
    }

    const response = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (response.error) {
      console.error("Supabase 인증 오류:", response.error);
      return NextResponse.json({ error: "이메일 또는 비밀번호가 잘못되었습니다." }, { status: 401 });
    }

    return NextResponse.json(response);
  } catch (e) {
    if (e instanceof Error) {
      console.error("알 수 없는 오류 발생:", e.message);
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
}

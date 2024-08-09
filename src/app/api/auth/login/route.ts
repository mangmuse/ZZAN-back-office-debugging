import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const supabase = createClient();

    const response = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (response.error) {
      console.error("Supabase 인증 오류:", response.error);
      return NextResponse.json({ error: "이메일 또는 비밀번호가 잘못되었습니다." }, { status: 401 });
    }

    if (response.data.session) {
      const accessToken = response.data.session?.access_token;
      const refreshToken = response.data.session?.refresh_token;
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (sessionError) {
        console.error("세션 설정 중 오류 발생:", sessionError);
        return NextResponse.json({ error: "세션 설정 중 오류가 발생했습니다." }, { status: 500 });
      }
    }

    return NextResponse.json(response);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
}

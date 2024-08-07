import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: Tables<"users">["userId"] } }
) => {
  const supabase = createClient();
  try {
    const { data: user, error } = await supabase.auth.admin.getUserById(userId);
    if (error) {
      console.log(error);
      throw new Error(`사용자 업데이트 실패: ${error.message}`);
    }
    return NextResponse.json(user.user.user_metadata?.is_blocked ?? null);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const PATCH = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: Tables<"users">["userId"] } }
) => {
  const supabase = createClient();
  try {
    const { data: user, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        is_blocked: true
      }
    });
    if (error) {
      console.log(error);
      throw new Error(`사용자 업데이트 실패: ${error.message}`);
    }
    const isBlocked = user.user.user_metadata.is_blocked;
    console.log(isBlocked);
    return NextResponse.json(isBlocked);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

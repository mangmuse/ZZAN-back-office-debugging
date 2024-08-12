import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params: { quizId } }: { params: { quizId: number } }) => {
  const supabase = createClient();

  try {
    if (quizId) {
      const { data, error } = await supabase.from("quizzes").select("*").eq("quizId", quizId).single();
      if (error) {
        throw new Error("퀴즈 정보를 가져오지 못했습니다");
      }
      return NextResponse.json(data);
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();
  const updatedQuiz = await req.json();

  try {
    const { status, statusText } = await supabase
      .from("quizzes")
      .update(updatedQuiz)
      .eq("quizId", updatedQuiz.quizId)
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

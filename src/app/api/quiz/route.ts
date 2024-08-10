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
      .from("quizzes")
      .select("*", { count: "exact" })
      .order("issue_date", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error("퀴즈 목록을 가져오지 못했습니다.");
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

export const POST = async (req: Request) => {
  const supabase = createClient();

  try {
    const newQuiz = await req.json();

    const { data: existingQuiz, error: existingQuizError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("issue_date", newQuiz.issue_date)
      .single();

    if (existingQuiz) {
      return NextResponse.json({ error: "해당 발행일자에 이미 퀴즈가 존재합니다." }, { status: 400 });
    }

    if (existingQuizError && existingQuizError.code !== "PGRST116") {
      throw new Error("퀴즈를 조회하는 중 오류가 발생했습니다.");
    }

    const { status, statusText } = await supabase.from("quizzes").insert(newQuiz).single();

    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
};

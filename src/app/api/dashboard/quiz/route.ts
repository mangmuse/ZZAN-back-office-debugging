import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

export const GET = async (req: NextRequest) => {
  const supabase = createClient();

  try {
    let date = req.nextUrl.searchParams.get("date");
    if (!date) {
      date = dayjs().format("YYYY-MM-DD");
    }

    const startOfDay = dayjs(date).startOf("day").toISOString();
    const endOfDay = dayjs(date).endOf("day").toISOString();

    const { data: quizzes, error: quizError } = await supabase.from("quizzes").select("quizId").eq("issue_date", date);

    if (quizError) {
      throw new Error("퀴즈 데이터를 가져오는 중 오류가 발생했습니다.");
    }

    const quizIds = quizzes.map((quiz) => quiz.quizId);

    const { data: answers, error: answerError } = await supabase
      .from("answers")
      .select("answer, quiz_id")
      .in("quiz_id", quizIds)
      .gte("created_at", startOfDay)
      .lte("created_at", endOfDay);

    if (answerError) {
      throw new Error("퀴즈 답변 데이터를 가져오는 중 오류가 발생했습니다.");
    }

    const correctCount = answers.filter((answer) => answer.answer === true).length;
    const incorrectCount = answers.filter((answer) => answer.answer === false).length;

    return NextResponse.json({
      date,
      correct: correctCount,
      incorrect: incorrectCount
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

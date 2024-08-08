import { RECENT_DAYS } from "@/constants";
import { getStartDate } from "@/utils/getDate";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("asd");
  const supabase = createClient();

  try {
    const startDate = getStartDate(RECENT_DAYS);

    const { data: knowhowData, error: knowhowError } = await supabase
      .from("knowhow_comments")
      .select("created_at")
      .gte("created_at", startDate);

    const { data: voteData, error: voteError } = await supabase
      .from("vote_comments")
      .select("created_at")
      .gte("created_at", startDate);

    if (knowhowError) {
      console.log(knowhowError);
      throw new Error("Knowhow 댓글 목록을 받아오지 못했습니다");
    }
    console.log(knowhowData);
    if (voteError) {
      console.log(voteError);
      throw new Error("Vote 댓글 목록을 받아오지 못했습니다");
    }
    console.log(voteData);
    const combinedData = [...(knowhowData || []), ...(voteData || [])];

    const recentDates = Array.from({ length: RECENT_DAYS }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const commentCounts: Record<string, number> = recentDates.reduce((acc: Record<string, number>, date: string) => {
      acc[date] = 0;
      return acc;
    }, {} as Record<string, number>);

    combinedData.forEach((comment: { created_at: string }) => {
      const date = new Date(comment.created_at).toISOString().split("T")[0];
      if (commentCounts[date] !== undefined) {
        commentCounts[date]++;
      }
    });
    console.log(commentCounts);
    return NextResponse.json(commentCounts);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

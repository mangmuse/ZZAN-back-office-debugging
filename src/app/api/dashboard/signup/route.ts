import { RECENT_DAYS } from "@/constants";
import { getStartDate } from "@/utils/getDate";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const supabase = createClient();

  try {
    const startDate = getStartDate(RECENT_DAYS);

    const { data, error } = await supabase.from("users").select("created_at").gte("created_at", startDate);

    if (error) {
      console.log(error);
      throw new Error("유저 목록을 받아오지 못했습니다");
    }

    const recentDates = Array.from({ length: RECENT_DAYS }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const signupCounts: Record<string, number> = recentDates.reduce((acc: Record<string, number>, date: string) => {
      acc[date] = 0;
      return acc;
    }, {} as Record<string, number>);

    data!.forEach((user: { created_at: string }) => {
      const date = new Date(user.created_at).toISOString().split("T")[0];
      if (signupCounts[date] !== undefined) {
        signupCounts[date]++;
      }
    });

    return NextResponse.json(signupCounts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

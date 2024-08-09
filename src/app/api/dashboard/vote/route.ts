import { RECENT_DAYS } from "@/constants";
import { getStartDate, getTimeRange } from "@/utils/getDate";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export const GET = async () => {
  const supabase = createClient();

  try {
    const startDate = getStartDate(RECENT_DAYS);
    const { endOfDayUTC } = getTimeRange();

    const { data, error } = await supabase
      .from("vote_posts")
      .select("created_at")
      .gte("created_at", startDate)
      .lt("created_at", endOfDayUTC);

    if (error) {
      console.log(error);
      throw new Error("소비평가 목록을 받아오지 못했습니다");
    }

    const recentDates = Array.from({ length: RECENT_DAYS }, (_, i) => {
      return dayjs().subtract(i, "day").format("YYYY-MM-DD");
    }).reverse();

    const voteCounts: Record<string, number> = recentDates.reduce((acc: Record<string, number>, date: string) => {
      acc[date] = 0;
      return acc;
    }, {} as Record<string, number>);

    data!.forEach((user: { created_at: string }) => {
      const date = dayjs(user.created_at).format("YYYY-MM-DD");
      if (voteCounts[date] !== undefined) {
        voteCounts[date]++;
      }
    });

    return NextResponse.json(voteCounts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

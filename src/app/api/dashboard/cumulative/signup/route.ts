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

    const { data: initialData, error: initialError } = await supabase
      .from("users")
      .select("created_at")
      .lt("created_at", startDate);

    if (initialError) {
      throw new Error("이전 유저 목록을 받아오지 못했습니다");
    }

    let initialCount = initialData ? initialData.length : 0;

    const { data, error } = await supabase
      .from("users")
      .select("created_at")
      .gte("created_at", startDate)
      .lt("created_at", endOfDayUTC);

    if (error) {
      throw new Error("유저 목록을 받아오지 못했습니다");
    }

    const recentDates = Array.from({ length: RECENT_DAYS }, (_, i) => {
      return dayjs().subtract(i, "day").format("YYYY-MM-DD");
    }).reverse();

    const signupCounts: Record<string, number> = recentDates.reduce((acc, date) => {
      acc[date] = 0;
      return acc;
    }, {} as Record<string, number>);

    data!.forEach((user) => {
      const date = dayjs(user.created_at).format("YYYY-MM-DD");
      if (signupCounts[date] !== undefined) {
        signupCounts[date]++;
      }
    });

    let cumulativeCount = initialCount;
    const cumulativeSignupCounts = recentDates.reduce((acc, date) => {
      cumulativeCount += signupCounts[date];
      acc[date] = cumulativeCount;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json(cumulativeSignupCounts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

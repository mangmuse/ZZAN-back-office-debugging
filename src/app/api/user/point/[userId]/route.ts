import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: Tables<"users">["userId"] } }
) => {
  const supabase = createClient();
  try {
    const pointAction = await req.json();
    const { points, reason } = pointAction;
    const pointsValue = Number(points);

    const { data: pointData, error: pointError } = await supabase
      .from("points")
      .insert([{ point: pointsValue, reason, user_id: userId }]);

    if (pointError) {
      throw new Error(`포인트 추가 실패: ${pointError.message}`);
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("total_point, current_point")
      .eq("userId", userId)
      .single();

    if (userError) {
      console.log(userError);
      throw new Error(`사용자 정보 조회 실패: ${userError.message}`);
    }

    const updatedTotalPoint = Number(userData.total_point) + pointsValue;
    const updatedCurrentPoint = Number(userData.current_point) + pointsValue;

    const { data: updateUserData, error: updateUserError } = await supabase
      .from("users")
      .update({ total_point: updatedTotalPoint, current_point: updatedCurrentPoint })
      .eq("userId", userId);

    if (updateUserError) {
      console.log(updateUserError);
      throw new Error(`사용자 포인트 업데이트 실패: ${updateUserError.message}`);
    }

    return NextResponse.json({ message: "포인트가 성공적으로 추가되었습니다." });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

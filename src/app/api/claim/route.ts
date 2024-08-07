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
    const {
      data: giftClaims,
      error,
      count
    } = await supabase
      .from("gift_claims")
      .select(
        `
        *,
        gifts (gift_name),
        users (nickname, email)
      `,
        { count: "exact" }
      )
      .order("is_sent", { ascending: true })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error("기프티콘 신청 내역을 가져오지 못했습니다");
    }

    const transformedGiftClaims = giftClaims.map((claim) => {
      const { gifts, users, ...rest } = claim;
      return {
        ...rest,
        gift_name: gifts?.gift_name,
        nickname: users?.nickname,
        email: users?.email
      };
    });

    revalidatePath("/", "layout");
    if (count) {
      const totalPages = Math.ceil(count / limit);
      return NextResponse.json({ data: transformedGiftClaims, totalPages });
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
  const updatedClaim = await req.json();

  try {
    const { status, statusText } = await supabase
      .from("gift_claims")
      .update(updatedClaim)
      .eq("gift_claimId", updatedClaim.gift_claimId)
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

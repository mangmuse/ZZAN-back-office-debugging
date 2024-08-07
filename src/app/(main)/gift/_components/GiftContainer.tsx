"use client";

import GiftList from "@/app/(main)/gift/_components/GiftList";
import { buttonVariants } from "@/components/ui/button";
import useGiftsQuery from "@/store/queries/gift/useGiftsQuery";
import Link from "next/link";

function GiftContainer() {
  const { data: gifts } = useGiftsQuery();
  gifts && console.log(gifts);
  return (
    <div>
      <div className="flex justify-end ">
        <Link href="/gift/write" className={buttonVariants({ variant: "default" })}>
          상품 추가
        </Link>
      </div>
      {gifts && <GiftList gifts={gifts} />}
    </div>
  );
}

export default GiftContainer;

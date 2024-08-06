"use client";

import GiftList from "@/app/(main)/gift/_components/GiftList";
import { Button } from "@/components/ui/button";
import useGiftsQuery from "@/store/queries/gift/useGiftsQuery";

function GiftContainer() {
  const { data: gifts } = useGiftsQuery();
  gifts && console.log(gifts);
  return (
    <div>
      <div className="flex justify-end">
        <Button className="text-xl self-end" variant={"outline"}>
          +
        </Button>
      </div>
      {gifts && <GiftList gifts={gifts} />}
    </div>
  );
}

export default GiftContainer;

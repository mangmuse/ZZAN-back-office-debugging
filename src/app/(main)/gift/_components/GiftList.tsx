import GiftItem from "@/app/(main)/gift/_components/GiftItem";
import { Tables } from "@/types/supabase";

type GiftListProps = {
  gifts: Tables<"gifts">[];
};

function GiftList({ gifts }: GiftListProps) {
  return (
    <ul className=" grid gap-x-4 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {gifts.map((gift) => (
        <GiftItem key={gift.giftId} gift={gift} />
      ))}
    </ul>
  );
}

export default GiftList;

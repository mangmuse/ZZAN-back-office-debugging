import { getGift } from "@/apis/gift";
import GiftForm from "@/app/(main)/gift/_components/GiftForm";

async function EditGiftPage({ params: { giftId } }: { params: { giftId: number } }) {
  const gift = await getGift(giftId);

  return (
    <>
      <GiftForm previousGift={gift} />
    </>
  );
}

export default EditGiftPage;

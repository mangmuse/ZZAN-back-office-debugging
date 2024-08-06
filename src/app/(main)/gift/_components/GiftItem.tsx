"use client";
import { Button } from "@/components/ui/button";
import useGiftMutation from "@/store/queries/gift/useGiftMutation";
import { Tables } from "@/types/supabase";
import { showConfirmationDialogWithInput, showErrorDialog, showSuccessDialog } from "@/utils/sweetAlert";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function GiftItem({ gift }: { gift: Tables<"gifts"> }) {
  const { removeGift } = useGiftMutation();
  const router = useRouter();

  const handleGiftDelete = async () => {
    const result = await showConfirmationDialogWithInput(
      "삭제하시겠습니까?",
      `삭제할 상품명을 입력해주세요 "${gift.gift_name}"`,
      "기프트 이름을 입력하세요",
      gift.gift_name
    );

    if (result.isConfirmed) {
      try {
        await removeGift(gift.giftId);
        showSuccessDialog("삭제되었습니다");
      } catch (error) {
        showErrorDialog("에러가 발생했습니다.", "다시 시도 해 주세요");
      }
    }
  };

  return (
    <li className="flex justify-center mb-6">
      <div className="w-full h-full max-w-xs rounded overflow-hidden shadow-lg bg-white">
        <div className="relative">
          <Image
            src={gift.img_url}
            alt={gift.gift_name}
            width={400}
            height={200}
            className="object-cover w-full h-48"
          />
          <div className="absolute top-2 right-2">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton as={Button} variant="ghost" size="sm">
                <span className="sr-only">Open options</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10ZM12 18C13.1046 18 14 18.8954 14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18Z" />
                </svg>
              </MenuButton>
              <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem
                    as="button"
                    onClick={() => router.push(`/gift/edit/${gift.giftId}`)}
                    className="text-gray-700 block px-4 py-2 text-sm"
                  >
                    Edit
                  </MenuItem>
                  <MenuItem as="button" onClick={handleGiftDelete} className="text-gray-700 block px-4 py-2 text-sm">
                    Delete
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{gift.gift_name}</div>
          <p className="text-gray-700 text-base">{gift.brand_name}</p>
          <p className="text-gray-700 text-base">{gift.category}</p>
        </div>
      </div>
    </li>
  );
}

export default GiftItem;

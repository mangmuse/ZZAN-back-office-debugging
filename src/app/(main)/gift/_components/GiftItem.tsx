"use client";
import { Button } from "@/components/ui/button";
import useGiftMutation from "@/store/queries/gift/useGiftMutation";
import { Tables } from "@/types/supabase";
import { showConfirmationDialogWithInput, showErrorDialog, showSuccessDialog } from "@/utils/sweetAlert";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import kebab from "/public/icons/kebab.svg";

function GiftItem({ gift }: { gift: Tables<"gifts"> }) {
  const { removeGift } = useGiftMutation();
  const router = useRouter();

  const handleGiftDelete = async () => {
    const result = await showConfirmationDialogWithInput(
      "삭제하시겠습니까?",
      `삭제할 상품명을 입력해주세요 "${gift.gift_name}"`,
      "삭제할 상품명을 입력해주세요",
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
      <div className="w-full h-full max-w-md rounded overflow-hidden shadow-lg bg-white">
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
                <Image src={kebab} alt="kebab_menu" width={24} height={24} />
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
          <div className="font-bold text-sm mb-2">{gift.gift_name}</div>
          <p className="text-gray-700 text-base">{gift.brand_name}</p>
          <p className="text-gray-700 text-base">{gift.category}</p>
        </div>
      </div>
    </li>
  );
}

export default GiftItem;

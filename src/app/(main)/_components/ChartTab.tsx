import React from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import signUpIcon from "/public/icons/signUp.svg";
import voteIcon from "/public/icons/vote.svg";
import knowhowIcon from "/public/icons/knowhow.svg";
import commentIcon from "/public/icons/comment.svg";
import { TABS, TTabType } from "@/app/(main)/_constant";

type ChartTabProps = {
  label: TTabType;
  count: number;
  isSelected: boolean;
  onClick: () => void;
};

const tabColors: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "bg-green-400",
  [TABS.KNOWHOWS]: "bg-blue-400",
  [TABS.VOTES]: "bg-red-400",
  [TABS.COMMENTS]: "bg-yellow-400"
};

const tabColorsSelected: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "bg-green-600",
  [TABS.KNOWHOWS]: "bg-blue-600",
  [TABS.VOTES]: "bg-red-600",
  [TABS.COMMENTS]: "bg-yellow-600"
};

const icons: Record<TTabType, StaticImageData> = {
  [TABS.SIGNUPS]: signUpIcon,
  [TABS.KNOWHOWS]: knowhowIcon,
  [TABS.VOTES]: voteIcon,
  [TABS.COMMENTS]: commentIcon
};

const descriptions: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "Today's Sign Ups",
  [TABS.KNOWHOWS]: "Today's KnowHows",
  [TABS.VOTES]: "Today's Votes",
  [TABS.COMMENTS]: "Today's Comments"
};

function ChartTab({ label, count, isSelected, onClick }: ChartTabProps) {
  return (
    <div className="flex flex-col items-center p-4 w-full">
      <button
        className={clsx(
          "flex-1 flex flex-col items-center p-4 h-32 text-center rounded-lg transition-colors w-full",
          tabColors[label],
          {
            [tabColorsSelected[label]]: isSelected,
            "text-white": isSelected,
            "text-gray-700": !isSelected
          },
          "hover:bg-opacity-75"
        )}
        onClick={onClick}
      >
        <div className="relative w-10 h-10 mb-2">
          <Image src={icons[label]} alt={label} layout="responsive" width={40} height={40} />
        </div>
        <span className="text-3xl font-semibold mt-2">{count}</span>
        <span className="text-lg font-semibold mt-2">{descriptions[label]}</span>
      </button>
    </div>
  );
}

export default ChartTab;

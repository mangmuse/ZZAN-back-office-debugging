import clsx from "clsx";
import Image from "next/image";

import { TAB_COLORS, TAB_COLORS_SELECTED, TAB_DESCRIPTIONS, TAB_ICONS, TTabType } from "@/app/(main)/_constant";
import { UseQueryResult } from "@tanstack/react-query";

type ChartTabProps = {
  label: TTabType;
  isSelected: boolean;
  onClick: () => void;
  useQuery: () => UseQueryResult<number>;
};

function ChartTab({ label, isSelected, onClick, useQuery }: ChartTabProps) {
  const { data: count } = useQuery();

  return (
    <div className="flex flex-col items-center  w-full">
      <button
        className={clsx(
          "flex-1 flex flex-col items-center p-4 h-32 text-center rounded-lg transition-colors w-full",
          TAB_COLORS[label],
          {
            [TAB_COLORS_SELECTED[label]]: isSelected,
            "text-white": isSelected,
            "text-gray-700": !isSelected
          },
          "hover:bg-opacity-75"
        )}
        onClick={onClick}
      >
        <div className="relative w-10 h-10 mb-2">
          <Image src={TAB_ICONS[label]} alt={label} layout="responsive" width={40} height={40} />
        </div>
        <span className="text-3xl font-semibold mt-2">{count || 0}</span>
        <span className="text-lg font-semibold mt-2">{TAB_DESCRIPTIONS[label]}</span>
      </button>
    </div>
  );
}

export default ChartTab;

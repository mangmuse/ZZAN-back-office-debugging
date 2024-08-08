import { PayloadItem } from "@/types/dashboard.type";

type CustomTooltipProps = {
  active?: boolean;
  payload?: PayloadItem[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0];
    const total = payload.reduce((acc, item) => acc + item.value, 0);
    const percent = total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";

    return (
      <div className="p-4 bg-white border rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <div className={`w-5 h-5 mr-3 rounded-full`} style={{ backgroundColor: fill }} />
          <p className="text-base font-semibold">{name}</p>
        </div>
        <p className="text-base">{`${value} (${percent}%)`}</p>
      </div>
    );
  }
  return null;
}
export default CustomTooltip;

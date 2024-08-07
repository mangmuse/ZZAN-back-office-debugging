import dayjs from "dayjs";

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
  maxIndex: number;
  customLabel: string;
};

function CustomTooltip({ active, payload, label, maxIndex, customLabel }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const date = dayjs()
      .subtract(maxIndex - Number(label), "day")
      .format("YYYY.MM.DD");

    return (
      <div className="bg-white p-2 border rounded shadow-lg">
        <p className="font-bold">{date}</p>
        <p className="text-gray-500">
          <span className="text-xs text-gray-500">&#9632;</span> {customLabel}: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
}
export default CustomTooltip;

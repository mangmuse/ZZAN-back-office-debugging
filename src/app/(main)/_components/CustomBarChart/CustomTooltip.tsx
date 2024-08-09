import dayjs from "dayjs";

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
  maxIndex: number;
  customLabel: string;
  dataKey: string;
};

function CustomTooltip({ active, payload, label, maxIndex, customLabel, dataKey }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload[dataKey];
    const index = payload[0].payload.index;
    const date = dayjs()
      .subtract(maxIndex - index, "day")
      .format("YYYY.MM.DD");

    return (
      <div className="bg-white p-2 border rounded shadow-lg">
        <p className="font-bold">{date}</p>
        <p className="text-gray-500">
          <span className="text-xs text-gray-500">&#9632;</span> {customLabel}: {data}
        </p>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;

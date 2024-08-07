import dayjs from "dayjs";
import { XAxis } from "recharts";

function CustomXAxis({ dataKey, maxIndex }: { dataKey: string; maxIndex: number }) {
  return (
    <XAxis
      dataKey={dataKey}
      tickFormatter={(tick) => {
        const date = dayjs()
          .subtract(maxIndex - Number(tick), "day")
          .format("YYYY.MM.DD");
        return date;
      }}
    />
  );
}
export default CustomXAxis;

import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import CustomTooltip from "@/app/(main)/_components/QuizPieChart/CustomToolTip";
import useQuizAnswersQuery from "@/store/queries/dashboard/useQuizAnswersQuery";

type QuizPieChartProps = {
  selectedDate: string;
};

const COLORS = ["#0088FE", "#FF8042"];
const EMPTY_COLOR = "#D1D5DB";

function QuizPieChart({ selectedDate }: QuizPieChartProps) {
  const { data, isPending } = useQuizAnswersQuery(selectedDate);

  const correct = data?.correct ?? 0;
  const incorrect = data?.incorrect ?? 0;
  const total = correct + incorrect;
  const correctPercent = total > 0 ? ((correct / total) * 100).toFixed(2) : "0.00";
  const incorrectPercent = total > 0 ? ((incorrect / total) * 100).toFixed(2) : "0.00";

  const chartData =
    total > 0
      ? [
          { name: "정답", value: correct, fill: COLORS[0] },
          { name: "오답", value: incorrect, fill: COLORS[1] }
        ]
      : [{ name: "No Data", value: 1, fill: EMPTY_COLOR }];

  return (
    <article className="flex flex-col items-center justify-center p-4 w-full">
      {isPending || !data ? (
        <div className="flex items-center justify-center w-full h-[250px]">
          <LoadingSpinner color="text-blue-500" />
        </div>
      ) : (
        <>
          {total === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-[250px]">
              <div className="relative w-full max-w-[250px] h-[250px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[{ name: "No Data", value: 1, fill: EMPTY_COLOR }]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      stroke="none"
                      outerRadius="85%"
                      dataKey="value"
                    >
                      <Cell key="empty-cell" fill={EMPTY_COLOR} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-lg text-gray-700 mt-4">제출된 퀴즈가 없습니다</p>
            </div>
          ) : (
            <>
              <CardHeader className="flex flex-col items-center pb-4">
                <CardTitle className="text-xl font-semibold">퀴즈 결과</CardTitle>
                <div className="text-base text-muted-foreground mt-2">총 {total}개의 답변</div>
              </CardHeader>
              <CardContent className="flex-1 w-full flex items-center justify-center">
                <div className="relative w-full max-w-[250px] h-[250px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        stroke="none"
                        outerRadius="85%"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col items-start gap-4 text-base mt-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-3 bg-blue-500 rounded-full" />
                    <span className="self-start">
                      정답 수: {correct} ({correctPercent}%)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-3 bg-orange-500 rounded-full" />
                    <span className="self-start">
                      오답 수: {incorrect} ({incorrectPercent}%)
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-center text-base mt-4">
                <div className="text-muted-foreground">전체 답변 중 정답률과 오답률</div>
              </CardFooter>
            </>
          )}
        </>
      )}
    </article>
  );
}

export default QuizPieChart;

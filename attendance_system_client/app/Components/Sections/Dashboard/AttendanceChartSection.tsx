import { BarDatum } from "@nivo/bar";
import ResponsiveBarChart from "@/app/Components/Charts/ResponsiveBarChart";

interface AttendanceChartSectionProps {
  chartData: BarDatum[];
}

const AttendanceChartSection = ({
  chartData,
}: AttendanceChartSectionProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        Monthly Attendance Overview
      </h3>
      <ResponsiveBarChart
        data={chartData}
        keys={["present", "absent"]}
        indexBy="month"
        height="400px"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Months",
          legendPosition: "middle",
          legendOffset: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Students",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        ariaLabel="Monthly attendance bar chart"
        barAriaLabel={(e: any) =>
          `${e.id}: ${e.formattedValue} in ${e.indexValue}`
        }
      />
    </div>
  );};

export default AttendanceChartSection;
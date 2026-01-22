"use client";

import ResponsiveBarChart from "@/app/Components/Charts/ResponsiveBarChart";
import { BarDatum } from "@nivo/bar";

interface GenderComparisonSectionProps {
  chartData?: BarDatum[];
}

const GenderComparisonSection = ({
  chartData,
}: GenderComparisonSectionProps) => {
  // Default sample data if not provided
  // Format: { category: "Present" | "Absent", male: number, female: number }
  const defaultChartData: BarDatum[] = [
    { category: "Present", male: 120, female: 135 },
    { category: "Absent", male: 15, female: 12 },
  ];

  const data = chartData || defaultChartData;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        Attendance Comparison: Male vs Female
      </h3>
      <ResponsiveBarChart
        data={data}
        keys={["male", "female"]}
        indexBy="category"
        height="400px"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        colors={({ id }) => {
          if (id === "male") return "#3b82f6"; // Blue for male
          if (id === "female") return "#ec4899"; // Pink for female
          return "#6b7280";
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Attendance Status",
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
        ariaLabel="Male vs Female attendance comparison for present and absent"
        barAriaLabel={(e: any) =>
          `${e.id}: ${e.formattedValue} students in ${e.indexValue} category`
        }
      />
    </div>
  );};

export default GenderComparisonSection;
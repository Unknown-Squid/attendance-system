"use client";

import ResponsivePieChart from "@/app/Components/Charts/ResponsivePieChart";
import { PieDatum } from "@nivo/pie";

interface TodayAttendanceSectionProps {
  chartData?: PieDatum[];
  totalStudents?: number;
  presentCount?: number;
  absentCount?: number;
  recordedCount?: number;
}

const TodayAttendanceSection = ({
  chartData,
  totalStudents = 150,
  presentCount = 120,
  absentCount = 15,
  recordedCount = 135,
}: TodayAttendanceSectionProps) => {
  // Calculate not recorded
  const notRecorded = totalStudents - recordedCount;

  // Default sample data if not provided
  const defaultChartData: PieDatum[] = [
    {
      id: "Present",
      label: "Present",
      value: presentCount,
      color: "#22c55e",
    },
    {
      id: "Absent",
      label: "Absent",
      value: absentCount,
      color: "#ef4444",
    },
    {
      id: "Not Recorded",
      label: "Not Recorded",
      value: notRecorded,
      color: "#6b7280",
    },
  ];

  const data = chartData || defaultChartData;

  const colors = (datum: PieDatum) => {
    if (datum.id === "Present") return "#22c55e";
    if (datum.id === "Absent") return "#ef4444";
    if (datum.id === "Not Recorded") return "#6b7280";
    return "#6b7280";
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Today's Attendance
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Total Students: {totalStudents} | Recorded: {recordedCount}
      </p>
      <ResponsivePieChart
        data={data}
        height="350px"
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        colors={colors}
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={4}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "var(--foreground)",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
          },
        ]}
        ariaLabel="Today's attendance pie chart"
      />
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {presentCount}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Present</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {absentCount}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Absent</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-500 dark:text-zinc-400">
            {notRecorded}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Not Recorded</p>
        </div>
      </div>
    </div>
  );
};

export default TodayAttendanceSection;


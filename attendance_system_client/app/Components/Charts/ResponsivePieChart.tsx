"use client";

import { ResponsivePie, PieDatum, ResponsivePieSvgProps } from "@nivo/pie";

interface ResponsivePieChartProps {
  data: PieDatum[];
  height?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: ResponsivePieSvgProps["colors"];
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  legends?: ResponsivePieSvgProps["legends"];
  ariaLabel?: string;
}

const ResponsivePieChart = ({
  data,
  height = "400px",
  margin = { top: 40, right: 80, bottom: 80, left: 80 },
  colors,
  innerRadius = 0.5,
  padAngle = 2,
  cornerRadius = 4,
  legends,
  ariaLabel = "Pie chart",
}: ResponsivePieChartProps) => {
  const defaultColors = ["#22c55e", "#ef4444", "#6b7280", "#3b82f6", "#ec4899"];

  const defaultTheme = {
    text: {
      fill: "var(--foreground)",
      fontSize: 12,
    },
    labels: {
      text: {
        fill: "var(--foreground)",
      },
    },
    legends: {
      text: {
        fill: "var(--foreground)",
      },
    },
  };

  return (
    <div style={{ height, width: "100%" }}>
      <ResponsivePie
        data={data}
        margin={margin}
        innerRadius={innerRadius}
        padAngle={padAngle}
        cornerRadius={cornerRadius}
        activeOuterRadiusOffset={8}
        colors={colors || defaultColors}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="var(--foreground)"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={legends}
        theme={defaultTheme}
        ariaLabel={ariaLabel}
      />
    </div>
  );};

export default ResponsivePieChart;
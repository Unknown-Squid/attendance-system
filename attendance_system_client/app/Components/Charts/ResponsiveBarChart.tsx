"use client";

import { ResponsiveBar, BarDatum, ResponsiveBarSvgProps } from "@nivo/bar";

interface ResponsiveBarChartProps {
  data: BarDatum[];
  keys: string[];
  indexBy: string;
  height?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  padding?: number;
  colors?: ResponsiveBarSvgProps<BarDatum>["colors"];
  axisBottom?: ResponsiveBarSvgProps<BarDatum>["axisBottom"];
  axisLeft?: ResponsiveBarSvgProps<BarDatum>["axisLeft"];
  legends?: ResponsiveBarSvgProps<BarDatum>["legends"];
  ariaLabel?: string;
  barAriaLabel?: ResponsiveBarSvgProps<BarDatum>["barAriaLabel"];
  enableLabel?: boolean;
  labelSkipWidth?: number;
  labelSkipHeight?: number;
}

const ResponsiveBarChart = ({
  data,
  keys,
  indexBy,
  height = "400px",
  margin = { top: 50, right: 130, bottom: 50, left: 60 },
  padding = 0.3,
  colors,
  axisBottom,
  axisLeft,
  legends,
  ariaLabel = "Bar chart",
  barAriaLabel,
  enableLabel = false,
  labelSkipWidth = 12,
  labelSkipHeight = 12,
}: ResponsiveBarChartProps) => {
  const defaultColors = ({ id }: { id: string | number }) => {
    if (id === "present") return "#22c55e";
    if (id === "absent") return "#ef4444";
    return "#6b7280";
  };

  const defaultTheme = {
    text: {
      fill: "var(--foreground)",
      fontSize: 12,
    },
    axis: {
      domain: {
        line: {
          stroke: "var(--foreground)",
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: "var(--foreground)",
          strokeWidth: 1,
        },
        text: {
          fill: "var(--foreground)",
        },
      },
      legend: {
        text: {
          fill: "var(--foreground)",
        },
      },
    },
    grid: {
      line: {
        stroke: "var(--foreground)",
        strokeWidth: 0.5,
        opacity: 0.2,
      },
    },
  };

  const defaultDefs = [
    {
      id: "dots",
      type: "patternDots" as const,
      background: "inherit",
      color: "#38bcb2",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines" as const,
      background: "inherit",
      color: "#eed312",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ];

  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        padding={padding}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colors || defaultColors}
        defs={defaultDefs}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        enableLabel={enableLabel}
        labelSkipWidth={labelSkipWidth}
        labelSkipHeight={labelSkipHeight}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={legends}
        role="application"
        ariaLabel={ariaLabel}
        barAriaLabel={barAriaLabel}
        theme={defaultTheme}
      />
    </div>
  );
};

export default ResponsiveBarChart;


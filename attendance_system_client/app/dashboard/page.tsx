"use client";

import { useState } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import OverviewCard from "@/app/Components/Cards/OverviewCard";
import Header from "@/app/Components/Headers/Header";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { ResponsiveBar } from "@nivo/bar";

function DashboardContent() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "attendance", label: "Attendance" },
    { id: "students", label: "Students" },
    { id: "records", label: "Records" },
  ];

  // Sample data for the bar chart - months with Present and Absent values
  const chartData = [
    { month: "January", present: 45, absent: 5 },
    { month: "February", present: 42, absent: 8 },
    { month: "March", present: 48, absent: 2 },
    { month: "April", present: 40, absent: 10 },
    { month: "May", present: 46, absent: 4 },
    { month: "June", present: 44, absent: 6 },
    { month: "July", present: 43, absent: 7 },
    { month: "August", present: 47, absent: 3 },
    { month: "September", present: 41, absent: 9 },
    { month: "October", present: 45, absent: 5 },
    { month: "November", present: 44, absent: 6 },
    { month: "December", present: 46, absent: 4 },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Page Header */}
          <Header
            title="Dashboard"
          />
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <OverviewCard
              title="Total Students"
              total={0}
              breakdown={[
                { label: "Male", value: 0 },
                { label: "Female", value: 0 },
              ]}
              icon={<PeopleIcon className="w-6 h-6" />}
              iconColor="blue"
            />

            <OverviewCard
              title="Total Sections"
              total={0}
              breakdown={[
                { label: "Advisory", value: 0 },
                { label: "Non-Advisory", value: 0 },
              ]}
              icon={<ClassIcon className="w-6 h-6" />}
              iconColor="purple"
            />

            <OverviewCard
              title="Attendance"
              total={0}
              breakdown={[
                { label: "Present", value: 0 },
                { label: "Absent", value: 0 },
              ]}
              icon={<EventAvailableIcon className="w-6 h-6" />}
              iconColor="green"
            />
          </div>

          {/* Attendance Chart */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Monthly Attendance Overview
            </h3>
            <div className="h-[400px] w-full">
              <ResponsiveBar
                data={chartData}
                keys={["present", "absent"]}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={({ id, data }) => {
                  if (id === "present") return "#22c55e";
                  if (id === "absent") return "#ef4444";
                  return "#6b7280";
                }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
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
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                  from: "color",
                  modifiers: [["darker", 1.6]],
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
                role="application"
                ariaLabel="Monthly attendance bar chart"
                barAriaLabel={(e) =>
                  `${e.id}: ${e.formattedValue} in ${e.indexValue}`
                }
                theme={{
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
                }}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Recent Activity
            </h3>
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

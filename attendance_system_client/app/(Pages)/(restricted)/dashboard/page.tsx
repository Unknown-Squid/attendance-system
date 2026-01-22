"use client";

import { useState } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import StatsCardSection from "@/app/Components/Sections/Dashboard/StatsCardSection";
import AttendanceChartSection from "@/app/Components/Sections/Dashboard/AttendanceChartSection";
import GenderComparisonSection from "@/app/Components/Sections/Dashboard/GenderComparisonSection";
import TodayAttendanceSection from "@/app/Components/Sections/Dashboard/TodayAttendanceSection";
import RecentActivitySection from "@/app/Components/Sections/Dashboard/RecentActivitySection";
import { useDashboardStats } from "@/app/Hooks/useDashboardStats";
import { BarDatum } from "@nivo/bar";

function DashboardContent() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const { stats, loading, error } = useDashboardStats();
  
  // Transform monthly attendance data for chart
  const chartData = stats?.monthlyAttendance.map(item => ({
    month: item.month,
    present: item.present,
    absent: item.absent,
  })) || [];
  
  // Transform gender comparison data for chart
  const genderChartData = stats?.genderComparison.map(item => ({
    category: item.category,
    male: item.male,
    female: item.female,
    other: item.other,
  })) || [];
  
  // Transform today's attendance for pie chart
  const todayChartData = stats?.todayAttendance ? [
    {
      id: "Present",
      label: "Present",
      value: stats.todayAttendance.present,
      color: "#22c55e",
    },
    {
      id: "Absent",
      label: "Absent",
      value: stats.todayAttendance.absent,
      color: "#ef4444",
    },
    {
      id: "Not Recorded",
      label: "Not Recorded",
      value: stats.todayAttendance.notRecorded,
      color: "#6b7280",
    },
  ] : [];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
        <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">Loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
        <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="text-center py-12">
              <p className="text-red-500">Error: {error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          <StatsCardSection stats={stats} />
          {/* Gender Comparison and Today's Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GenderComparisonSection chartData={genderChartData} />
            <TodayAttendanceSection
              chartData={todayChartData}
              totalStudents={stats?.todayAttendance.totalStudents}
              presentCount={stats?.todayAttendance.present}
              absentCount={stats?.todayAttendance.absent}
              recordedCount={
                (stats?.todayAttendance.present || 0) +
                (stats?.todayAttendance.absent || 0) +
                (stats?.todayAttendance.late || 0) +
                (stats?.todayAttendance.excused || 0)
              }
            />
          </div>
          {/* Attendance Chart */}
          <AttendanceChartSection chartData={chartData} />
          {/* Recent Activity */}
          <RecentActivitySection activities={stats?.recentActivity} />
        </div>
      </main>
    </div>
  );
}

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default DashboardPage;
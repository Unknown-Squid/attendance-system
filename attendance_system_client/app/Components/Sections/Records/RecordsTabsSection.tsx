"use client";

import React from "react";
import Tabs from "@/app/Components/Tabs/Tabs";
import AttendanceTable, { AttendanceRecord } from "@/app/Components/Tables/AttendanceTable";

interface Tab {
  id: string;
  label: string;
}

interface RecordsTabsSectionProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  filteredRecords: AttendanceRecord[];
  onRemove: (id: string) => void;
  userRole?: string;
}

const RecordsTabsSection = ({
  tabs,
  activeTab,
  onTabChange,
  filteredRecords,
  onRemove,
  userRole,
}: RecordsTabsSectionProps) => {
  return (
    <>
      {/* Tabs */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Tab Content */}
      {activeTab === "attendance-records" && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Records</h2>
          <AttendanceTable
            records={filteredRecords}
            onRemove={onRemove}
            showQr={true}
            showSignature={true}
            showStatus={true}
            showDate={true}
            showTime={true}
          />
        </div>
      )}

      {activeTab === "student-records" && userRole === 'admin' && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Student Records</h2>
          <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
            <p>Student Records content will be displayed here</p>
            <p className="text-sm mt-2">This is an admin-only view</p>
          </div>
        </div>
      )}
    </>
  );};

export default RecordsTabsSection;
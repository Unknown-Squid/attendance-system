"use client";

import AttendanceCard from "@/app/Components/Cards/AttendanceCard";
import { AttendanceRecord } from "@/app/attendance/page";

interface AttendanceContentProps {
  activeTab: string;
  attendanceRecords: AttendanceRecord[];
  onTakeAttendance?: (recordId: string) => void;
  onDelete?: (recordId: string) => void;
  onArchive?: (recordId: string) => void;
}

export default function AttendanceContent({
  activeTab,
  attendanceRecords,
  onTakeAttendance,
  onDelete,
  onArchive,
}: AttendanceContentProps) {
  const filteredRecords = attendanceRecords.filter((r) => r.category === activeTab);

  if (filteredRecords.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredRecords.map((record) => (
        <AttendanceCard
          key={record.id}
          data={record.data}
          type={record.type}
          onTakeAttendance={() => onTakeAttendance?.(record.id)}
          onDelete={() => onDelete?.(record.id)}
          onArchive={() => onArchive?.(record.id)}
        />
      ))}
    </div>
  );
}


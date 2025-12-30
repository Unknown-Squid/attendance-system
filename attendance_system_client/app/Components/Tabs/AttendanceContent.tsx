"use client";

import AttendanceCard from "@/app/Components/Cards/AttendanceCard";
import { AttendanceRecord } from "@/app/attendance/page";

interface AttendanceContentProps {
  activeTab: string;
  attendanceRecords: AttendanceRecord[];
  onTakeAttendance?: (enrollmentKey: string) => void;
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
          key={record.uuid}
          data={record.data}
          type={record.type}
          category={record.category}
          onTakeAttendance={() => onTakeAttendance?.(record.enrollmentKey)}
          onDelete={() => onDelete?.(record.uuid)}
          onArchive={() => onArchive?.(record.uuid)}
        />
      ))}
    </div>
  );
}


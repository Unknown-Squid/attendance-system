"use client";

import AttendanceCard from "@/app/Components/Cards/AttendanceCard";
import { AttendanceRecord } from "@/app/attendance/page";

interface AttendanceContentProps {
  activeTab: string;
  attendanceRecords: AttendanceRecord[];
  onTakeAttendance?: (enrollmentKey: string) => void;
  onDelete?: (uuid: string) => void;
  onArchive?: (uuid: string) => void;
}

const AttendanceContent = ({
  activeTab,
  attendanceRecords,
  onTakeAttendance,
  onDelete,
  onArchive,
}: AttendanceContentProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {attendanceRecords.map((record) => (
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
  );};

export default AttendanceContent;
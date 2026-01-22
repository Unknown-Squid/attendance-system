"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Tabs from "@/app/Components/Tabs/Tabs";
import AttendanceContent from "@/app/Components/Tabs/Tabs Content/AttendanceContent";
import ArchiveFilterSection from "@/app/Components/Sections/Attendance/ArchiveFilterSection";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import { AttendanceRecord } from "@/app/(Pages)/(restricted)/attendance/page";
import { deleteAttendanceRoom, archiveAttendanceRoom } from "@/app/ApiClient/attendance/attendanceRooms";

interface AttendanceTabsSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoading: boolean;
  attendanceRecords: AttendanceRecord[];
  isAdmin: boolean;
  onSetConfirmationModal: (modal: {
    isOpen: boolean;
    title: string;
    message: string;
    icon: React.ReactNode;
    onConfirm: () => void;
    danger?: boolean;
    confirmLabel?: string;
  }) => void;
  onLoadAttendanceRooms: () => void;
}

const AttendanceTabsSection = ({
  activeTab,
  onTabChange,
  isLoading,
  attendanceRecords,
  isAdmin,
  onSetConfirmationModal,
  onLoadAttendanceRooms,
}: AttendanceTabsSectionProps) => {
  const router = useRouter();

  // For admin, only show event tab (meetings)
  const attendanceTabs = isAdmin
    ? [{ id: "event", label: "Meetings" }]
    : [
        { id: "regular-class", label: "Regular Class" },
        { id: "workshop", label: "Workshop" },
        { id: "examination", label: "Examination" },
        { id: "event", label: "Event" },
        { id: "archive", label: "Archive" },
      ];

  // Filter records based on active tab
  const filteredRecords = attendanceRecords.filter((r) => {
    if (activeTab === "archive") {
      return r.category === "archive";
    }
    return r.category === activeTab;
  });

  const handleTakeAttendance = (enrollmentKey: string) => {
    const record = attendanceRecords.find((r) => r.enrollmentKey === enrollmentKey);
    if (record) {
      // Encode the enrollmentKey to handle special characters
      const encodedKey = encodeURIComponent(enrollmentKey);
      const url = `/attendance/${record.category}/${encodedKey}`;
      router.push(url);
    } else {
      console.error("Record not found for enrollmentKey:", enrollmentKey);
    }
  };

  const handleDelete = (uuid: string) => {
    onSetConfirmationModal({
      isOpen: true,
      title: isAdmin ? "Delete Meeting" : "Delete Attendance",
      message: isAdmin 
        ? "Are you sure you want to delete this meeting? The meeting will be deleted and this action cannot be undone."
        : "Are you sure you want to delete this attendance room? The room will be deleted and this action cannot be undone.",
      icon: <DeleteIcon className="w-8 h-8" />,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteAttendanceRoom(uuid);
          onLoadAttendanceRooms();
        } catch (error) {
          console.error("Error deleting room:", error);
        }
      },
    });
  };

  const handleArchive = (uuid: string | undefined) => {
    onSetConfirmationModal({
      isOpen: true,
      title: isAdmin ? "Archive Meeting" : "Archive Attendance",
      message: isAdmin
        ? "Are you sure you want to archive this meeting? You can no longer use this meeting and will be moved to the archive section."
        : "Are you sure you want to archive this attendance room? You can no longer use this room and will be moved to the archive section.",
      icon: <ArchiveIcon className="w-8 h-8" />,
      danger: false,
      confirmLabel: "Archive",
      onConfirm: async () => {
        try {
          await archiveAttendanceRoom(uuid || "");
          onLoadAttendanceRooms();
        } catch (error) {
          console.error("Error archiving room:", error);
        }
      },
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
      <Tabs
        tabs={attendanceTabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "archive" && (
          <ArchiveFilterSection
            onExport={() => {
              // TODO: Implement export functionality
            }}
            onFilter={() => {
              // TODO: Implement filter functionality
            }}
          />
        )}
        {isLoading ? (
          <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
            Loading attendance rooms...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
            No attendance records found
          </div>
        ) : (
          <AttendanceContent
            activeTab={activeTab}
            attendanceRecords={filteredRecords} 
            onTakeAttendance={handleTakeAttendance}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceTabsSection;
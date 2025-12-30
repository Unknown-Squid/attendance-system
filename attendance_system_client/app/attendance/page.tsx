"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import Button from "@/app/Components/Buttons/Button";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import AddEventAttendanceModal, { EventAttendanceData } from "@/app/Components/Modals/AddEventAttendanceModal";
import AddRegularAttendanceModal, { RegularAttendanceData } from "@/app/Components/Modals/AddRegularAttendanceModal";
import AttendanceContent from "@/app/Components/Tabs/AttendanceContent";
import Tabs from "@/app/Components/Tabs/Tabs";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useAuth } from "@/app/Contexts/AuthContext";
import { getAttendanceRooms, createAttendanceRoom, deleteAttendanceRoom, archiveAttendanceRoom, AttendanceRoom } from "@/app/ApiClient/attendance/attendanceRooms";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";

export interface AttendanceRecord {
  uuid: string;
  enrollmentKey: string;
  type: "regular" | "event";
  data: RegularAttendanceData | EventAttendanceData;
  category: "regular-class" | "workshop" | "examination" | "event" | "archive";
  createdAt: Date;
}

function AttendancePageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activeMenu, setActiveMenu] = useState("attendance");
  const [activeTab, setActiveTab] = useState(isAdmin ? "event" : "regular-class");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRegularModalOpen, setIsRegularModalOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load attendance rooms from database
  useEffect(() => {
    loadAttendanceRooms();
  }, [activeTab, isAdmin]);

  const loadAttendanceRooms = async () => {
    try {
      setIsLoading(true);
      const filters: { category?: string; type?: string } = {};
      
      // For admin, only load event/meeting rooms
      if (isAdmin) {
        filters.category = "event";
      } else if (activeTab !== "archive") {
        filters.category = activeTab;
      }
      
      const response = await getAttendanceRooms(filters);
      if (response.success) {
        const records: AttendanceRecord[] = response.rooms.map((room: AttendanceRoom) => ({
          uuid: room.uuid,
          enrollmentKey: room.enrollmentKey,
          type: room.type,
          data: room.data,
          category: room.category,
          createdAt: room.createdAt ? new Date(room.createdAt) : new Date(),
        }));
        setAttendanceRecords(records);
      }
    } catch (error) {
      console.error("Error loading attendance rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    icon: React.ReactNode;
    onConfirm: () => void;
    danger?: boolean;
    confirmLabel?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
    icon: null,
    onConfirm: () => {},
    danger: false,
  });

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "attendance", label: "Attendance" },
    { id: "students", label: "Students" },
    { id: "records", label: "Records" },
  ];

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

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Page Header */}
          <Header
            title="Attendance"
          />

          {/* Action Buttons */}
          <div className="mb-6 flex gap-4">
            {isAdmin ? (
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={() => setIsEventModalOpen(true)}
              >
                <EventIcon className="w-5 h-5" />
                Add Meeting
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="flex items-center gap-2"
                  onClick={() => setIsRegularModalOpen(true)}
                >
                  <AddIcon className="w-5 h-5" />
                  Add Regular Attendance
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setIsEventModalOpen(true)}
                >
                  <EventIcon className="w-5 h-5" />
                  Add Event Attendance
                </Button>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
            <Tabs
              tabs={attendanceTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "archive" && (
                <div className="flex justify-end mb-4">
                  <div className="flex gap-2">
                    <Button variant="outline">Export</Button>
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>
              )}
              {isLoading ? (
                <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                  Loading attendance rooms...
                </div>
              ) : (
                <AttendanceContent
                  activeTab={activeTab}
                  attendanceRecords={filteredRecords}
                  onTakeAttendance={(enrollmentKey) => {
                    const record = attendanceRecords.find((r) => r.enrollmentKey === enrollmentKey);
                    if (record) {
                      // Encode the enrollmentKey to handle special characters
                      const encodedKey = encodeURIComponent(enrollmentKey);
                      const url = `/attendance/${record.category}/${encodedKey}`;
                      console.log("Navigating to:", url);
                      router.push(url);
                    } else {
                      console.error("Record not found for enrollmentKey:", enrollmentKey);
                    }
                  }}
                  onDelete={(recordId) => {
                    setConfirmationModal({
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
                          await deleteAttendanceRoom(recordId);
                          loadAttendanceRooms();
                        } catch (error) {
                          console.error("Error deleting room:", error);
                        }
                      },
                    });
                  }}
                  onArchive={(recordId) => {
                    setConfirmationModal({
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
                          await archiveAttendanceRoom(recordId);
                          loadAttendanceRooms();
                        } catch (error) {
                          console.error("Error archiving room:", error);
                        }
                      },
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Regular Attendance Modal */}
      <AddRegularAttendanceModal
        isOpen={isRegularModalOpen}
        onClose={() => setIsRegularModalOpen(false)}
        onSubmit={async (data: RegularAttendanceData) => {
          try {
            const timestamp = Date.now();
            const enrollmentKey = `REG-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
            
            await createAttendanceRoom({
              enrollmentKey,
              type: "regular",
              category: "regular-class",
              data,
            });
            
            setIsRegularModalOpen(false);
            loadAttendanceRooms();
          } catch (error: any) {
            console.error("Error creating attendance room:", error);
            alert(error.message || "Failed to create attendance room");
          }
        }}
      />

      {/* Add Event Attendance Modal */}
      <AddEventAttendanceModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={async (data: EventAttendanceData) => {
          try {
            const timestamp = Date.now();
            const enrollmentKey = `EVT-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
            
            await createAttendanceRoom({
              enrollmentKey,
              type: "event",
              category: "event",
              data,
            });
            
            setIsEventModalOpen(false);
            loadAttendanceRooms();
          } catch (error: any) {
            console.error("Error creating attendance room:", error);
            alert(error.message || "Failed to create attendance room");
          }
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() =>
          setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        icon={confirmationModal.icon}
        danger={confirmationModal.danger}
        confirmLabel={confirmationModal.confirmLabel}
      />
    </div>
  );
}

export default function AttendancePage() {
  return (
    <ProtectedRoute>
      <AttendancePageContent />
    </ProtectedRoute>
  );
}


"use client";

import React, { useState, useEffect, useCallback } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import AddEventAttendanceModal, { EventAttendanceData } from "@/app/Components/Modals/AddEventAttendanceModal";
import AddRegularAttendanceModal, { RegularAttendanceData } from "@/app/Components/Modals/AddRegularAttendanceModal";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import AttendanceButtonSection from "@/app/Components/Sections/Attendance/AttendanceButtonSection";
import AttendanceTabsSection from "@/app/Components/Sections/Attendance/AttendanceTabsSection";
import { useAuth } from "@/app/Contexts/AuthContext";
import { getAttendanceRooms, createAttendanceRoom, AttendanceRoom } from "@/app/ApiClient/attendance/attendanceRooms";

export interface AttendanceRecord {
  uuid: string;
  enrollmentKey: string;
  type: "regular" | "event";
  data: RegularAttendanceData | EventAttendanceData;
  category: "regular-class" | "workshop" | "examination" | "event" | "archive";
  createdAt: Date;
}

function AttendancePageContent() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activeMenu, setActiveMenu] = useState("attendance");
  const [activeTab, setActiveTab] = useState(isAdmin ? "event" : "regular-class");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRegularModalOpen, setIsRegularModalOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const loadAttendanceRooms = useCallback(async () => {
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
  }, [activeTab, isAdmin]);

  // Load attendance rooms from database
  useEffect(() => {
    loadAttendanceRooms();
  }, [loadAttendanceRooms]);

  // Event handlers
  const handleRegularModalClose = () => {
    setIsRegularModalOpen(false);
  };

  const handleRegularAttendanceSubmit = async (data: RegularAttendanceData) => {
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
  };

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
  };

  const handleEventAttendanceSubmit = async (data: EventAttendanceData) => {
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
  };

  const handleConfirmationModalClose = () => {
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }));
  };

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
          <AttendanceButtonSection
            isAdmin={isAdmin}
            setIsRegularModalOpen={setIsRegularModalOpen}
            setIsEventModalOpen={setIsEventModalOpen}
          />

          {/* Tabs */}
          <AttendanceTabsSection
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isLoading={isLoading}
            attendanceRecords={attendanceRecords}
            isAdmin={isAdmin}
            onSetConfirmationModal={setConfirmationModal}
            onLoadAttendanceRooms={loadAttendanceRooms}
          />
        </div>
      </main>

      {/* Add Regular Attendance Modal */}
      <AddRegularAttendanceModal
        isOpen={isRegularModalOpen}
        onClose={handleRegularModalClose}
        onSubmit={handleRegularAttendanceSubmit}
      />

      {/* Add Event Attendance Modal */}
      <AddEventAttendanceModal
        isOpen={isEventModalOpen}
        onClose={handleEventModalClose}
        onSubmit={handleEventAttendanceSubmit}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={handleConfirmationModalClose}
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

const AttendancePage = () => {
  return (
    <ProtectedRoute>
      <AttendancePageContent />
    </ProtectedRoute>
  );
};

export default AttendancePage;


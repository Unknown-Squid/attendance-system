"use client";

import { useState, useEffect } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import { AttendanceRecord } from "@/app/Components/Tables/AttendanceTable";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useAuth } from "@/app/Contexts/AuthContext";
import { filterRecords, FilterCriteria } from "@/app/Utils/filterUtils";
import FilterRecordsSection from "@/app/Components/Sections/Records/FilterRecordsSection";
import RecordsTabsSection from "@/app/Components/Sections/Records/RecordsTabsSection";
import { useAttendanceRecordsList } from "@/app/Hooks/useAttendanceRecordsList";
import { deleteAttendanceRecord } from "@/app/ApiClient/attendanceRecords/attendanceRecords";
import SuccessModal from "@/app/Components/Modals/SuccessModal";
import ErrorModal from "@/app/Components/Modals/ErrorModal";

function RecordsPageContent() {
  const [activeMenu, setActiveMenu] = useState("records");
  const [activeTab, setActiveTab] = useState("attendance-records");
  const { user } = useAuth();
  
  // Filter states
  const [classification, setClassification] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Success/Error modals
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  
  // Build filters for API call
  const apiFilters = {
    ...(date && { date }),
    ...(classification && { status: classification }),
    // Note: subject and roomId filtering would need to be handled differently
    // as the API doesn't directly support these filters
  };
  
  // Fetch records from backend
  const { records: fetchedRecords, loading, error, refetch } = useAttendanceRecordsList(apiFilters);
  
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);

  // Define tabs - Student Record only for admin
  const tabs = [
    { id: "attendance-records", label: "Attendance Records" },
    ...(user?.role === 'admin' ? [{ id: "student-records", label: "Student Records" }] : []),
  ];

  // Apply client-side filters (subject, search query) to fetched records
  useEffect(() => {
    if (fetchedRecords.length > 0 || !loading) {
      const filters: FilterCriteria = {
        classification,
        subject,
        date,
        searchQuery,
      };

      const filtered = filterRecords(fetchedRecords, filters);
      setFilteredRecords(filtered);
    }
  }, [fetchedRecords, searchQuery, classification, subject, date, loading]);

  const handleShow = () => {
    // Refetch records with current filters
    refetch();
  };

  const handleRemove = async (id: string) => {
    try {
      // Delete from backend
      await deleteAttendanceRecord(id);
      
      // Refresh records
      await refetch();
      
      // Show success message
      setSuccessModal({
        isOpen: true,
        message: "Attendance record deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting attendance record:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Failed to delete attendance record",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
        <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">Loading attendance records...</p>
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
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">Error Loading Records</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {error.message || "Failed to load attendance records"}
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Header title="Records" />

          <FilterRecordsSection
            classification={classification}
            subject={subject}
            date={date}
            searchQuery={searchQuery}
            activeTab={activeTab}
            setClassification={setClassification}
            setSubject={setSubject}
            setDate={setDate}
            setSearchQuery={setSearchQuery}
            onGenerateList={handleShow}
          />

          <RecordsTabsSection
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filteredRecords={filteredRecords}
            onRemove={handleRemove}
            userRole={user?.role}
          />
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: "" })}
        message={successModal.message}
        duration={3000}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  );
}

const RecordsPage = () => {
  return (
    <ProtectedRoute>
      <RecordsPageContent />
    </ProtectedRoute>
  );
};

export default RecordsPage;


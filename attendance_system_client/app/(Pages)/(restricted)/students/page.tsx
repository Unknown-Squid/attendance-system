"use client";

import { useState, useRef } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import StudentsListFilterSection from "@/app/Components/Sections/Students/StudentsListFilterSection";
import StudentsListTableSection, { StudentsListTableSectionRef } from "@/app/Components/Sections/Students/StudentsListTableSection";
import WarningIcon from "@mui/icons-material/Warning";
import { useAttendees } from "@/app/Hooks/useAttendees";
import { deleteAttendee } from "@/app/ApiClient/attendees/attendees";
import SuccessModal from "@/app/Components/Modals/SuccessModal";
import ErrorModal from "@/app/Components/Modals/ErrorModal";

function StudentsPageContent() {
  const [activeMenu, setActiveMenu] = useState("students");
  const tableSectionRef = useRef<StudentsListTableSectionRef>(null);
  
  // Filter states
  const [course, setCourse] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [yearLevel, setYearLevel] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [isFilterWarningOpen, setIsFilterWarningOpen] = useState<boolean>(false);
  
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
    type: 'student' as const,
    status: 'active',
    ...(course && { course }),
    ...(yearLevel && { yearLevel: Number(yearLevel) }),
    ...(section && { section }),
  };

  // Fetch students from backend
  const { attendees: students, loading, error, refetch } = useAttendees(apiFilters);

  const handleShow = () => {
    // Validate that all filters are filled
    if (!course || !major || !yearLevel || !section) {
      setIsFilterWarningOpen(true);
      return;
    }

    // Refetch with current filters
    refetch();
  };

  const handleRemove = async (id: string) => {
    try {
      // Delete from backend
      await deleteAttendee(id);
      
      // Refresh students list
      await refetch();
      
      // Show success message
      setSuccessModal({
        isOpen: true,
        message: "Student deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting student:", error);
      setErrorModal({
        isOpen: true,
        message: error.message || "Failed to delete student",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Header title="Students" />

          {/* Filters Section */}
          <StudentsListFilterSection
            yearLevel={yearLevel}
            section={section}
            course={course}
            major={major}
            setYearLevel={setYearLevel}
            setSection={setSection}
            setCourse={setCourse}
            setMajor={setMajor}
            onGenerateList={handleShow}
          />

          {/* Students Table */}
          <StudentsListTableSection
            ref={tableSectionRef}
            students={students}
            loading={loading}
            error={error}
            onRemove={handleRemove}
          />
        </div>
      </main>

      {/* Filter Warning Modal */}
      <ConfirmationModal
        isOpen={isFilterWarningOpen}
        onClose={() => setIsFilterWarningOpen(false)}
        onConfirm={() => setIsFilterWarningOpen(false)}
        title="Incomplete Filters"
        message="Please fill up all the filters first before generating the list."
        icon={<WarningIcon className="w-6 h-6" />}
        confirmLabel="OK"
        cancelLabel=""
        confirmVariant="primary"
      />

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

const StudentsPage = () => {
  return (
    <ProtectedRoute>
      <StudentsPageContent />
    </ProtectedRoute>
  );
};

export default StudentsPage;


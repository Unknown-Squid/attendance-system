"use client";

import { useState } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import Button from "@/app/Components/Buttons/Button";
import Select from "@/app/Components/Fields/Select";
import AttendanceTable, { AttendanceRecord } from "@/app/Components/Tables/AttendanceTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import WarningIcon from "@mui/icons-material/Warning";
import { filterRecords, FilterCriteria } from "@/app/Utils/filterUtils";

// Sample student data
const initialStudents: AttendanceRecord[] = [
  {
    id: "student-1",
    name: "John Doe",
    sex: "male",
    studentNumber: "2024-001",
    date: "",
    time: "",
    qr: "",
    signature: "",
    status: "present",
  },
  {
    id: "student-2",
    name: "Jane Smith",
    sex: "female",
    studentNumber: "2024-002",
    date: "",
    time: "",
    qr: "",
    signature: "",
    status: "present",
  },
  {
    id: "student-3",
    name: "Michael Johnson",
    sex: "male",
    studentNumber: "2024-003",
    date: "",
    time: "",
    qr: "",
    signature: "",
    status: "present",
  },
  {
    id: "student-4",
    name: "Sarah Williams",
    sex: "female",
    studentNumber: "2024-004",
    date: "",
    time: "",
    qr: "",
    signature: "",
    status: "present",
  },
  {
    id: "student-5",
    name: "David Brown",
    sex: "male",
    studentNumber: "2024-005",
    date: "",
    time: "",
    qr: "",
    signature: "",
    status: "present",
  },
];

const courses = [
  { value: "", label: "All Courses" },
  { value: "bsit", label: "BS Information Technology" },
  { value: "bscs", label: "BS Computer Science" },
  { value: "bsce", label: "BS Computer Engineering" },
  { value: "bsee", label: "BS Electrical Engineering" },
];

const majors = [
  { value: "", label: "All Majors" },
  { value: "software", label: "Software Engineering" },
  { value: "networking", label: "Networking" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "data-science", label: "Data Science" },
];

const yearLevels = [
  { value: "", label: "All Year Levels" },
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const sections = [
  { value: "", label: "All Sections" },
  { value: "a", label: "Section A" },
  { value: "b", label: "Section B" },
  { value: "c", label: "Section C" },
  { value: "d", label: "Section D" },
];

function StudentsPageContent() {
  const [activeMenu, setActiveMenu] = useState("students");
  const [students, setStudents] = useState<AttendanceRecord[]>(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState<AttendanceRecord[]>(initialStudents);
  
  // Filter states
  const [course, setCourse] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [yearLevel, setYearLevel] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [isFilterWarningOpen, setIsFilterWarningOpen] = useState<boolean>(false);

  const handleShow = () => {
    // Validate that all filters are filled
    if (!course || !major || !yearLevel || !section) {
      setIsFilterWarningOpen(true);
      return;
    }

    // Apply filters
    let filtered = [...students];

    // Note: In a real application, students would have course, major, yearLevel, and section properties
    // For now, we'll just show all students when filters are applied
    // You can extend the AttendanceRecord interface to include these fields

    // Apply filters (this is a placeholder - you'll need to add these fields to student data)
    // filtered = filtered.filter((student) => {
    //   if (course && student.course !== course) return false;
    //   if (major && student.major !== major) return false;
    //   if (yearLevel && student.yearLevel !== yearLevel) return false;
    //   if (section && student.section !== section) return false;
    //   return true;
    // });

    setFilteredStudents(filtered);
  };

  const handleRemove = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setFilteredStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Header title="Students" />

          {/* Filters Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>
            <div className="flex justify-between items-end">

              <div className="w-full h-fit gap-8 flex items-center">
                <div className="flex flex-col w-fit gap-2">
                  <Select
                    label="Year Level"
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    options={yearLevels}
                  />
                  <Select
                    label="Section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    options={sections}
                  />
                </div>

                <div className="flex flex-col w-[60%] gap-2">
                  <Select
                    label="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    options={courses}
                    className="w-full"
                  />
                  <Select
                    label="Major"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    options={majors}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end w-[20%]">
                <Button
                  variant="primary"
                  onClick={handleShow}
                  className="flex items-center gap-2"
                >
                  Generate List
                </Button>
              </div>

            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Student List</h2>
            <AttendanceTable
              records={filteredStudents}
              onRemove={handleRemove}
              showQr={false}
              showSignature={false}
              showStatus={false}
              showDate={false}
              showTime={false}
            />
          </div>
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
    </div>
  );
}

export default function StudentsPage() {
  return (
    <ProtectedRoute>
      <StudentsPageContent />
    </ProtectedRoute>
  );
}


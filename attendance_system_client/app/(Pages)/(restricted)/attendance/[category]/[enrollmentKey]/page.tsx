"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import Button from "@/app/Components/Fields/Buttons";
import Select from "@/app/Components/Fields/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClassIcon from "@mui/icons-material/Class";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { RegularAttendanceData } from "@/app/Components/Modals/AddRegularAttendanceModal";
import { EventAttendanceData } from "@/app/Components/Modals/AddEventAttendanceModal";
import AttendanceTable, { AttendanceRecord as TableAttendanceRecord } from "@/app/Components/Tables/AttendanceTable";
import QrCodeModal from "@/app/Components/Modals/QrCodeModal";
import CameraModal from "@/app/Components/Modals/CameraModal";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import RegisterAttendeeModal, { AttendeeData } from "@/app/Components/Modals/RegisterAttendeeModal";
import { useAttendanceRoom } from "@/app/Hooks/useAttendanceRoom";
import { useEnrolledAttendees } from "@/app/Hooks/useEnrolledAttendees";
import { useAttendanceRecords } from "@/app/Hooks/useAttendanceRecords";
import { createAttendee, updateAttendee } from "@/app/ApiClient/attendees/attendees";
import { createEnrollment } from "@/app/ApiClient/enrollments/enrollments";
import { createAttendanceRecord, deleteAttendanceRecord } from "@/app/ApiClient/attendanceRecords/attendanceRecords";
import { getStudentByStudentNumber } from "@/app/ApiClient/students/students";
import { processIdImage, extractTextFromImage } from "@/app/Utils/ocr";
import SuccessModal from "@/app/Components/Modals/SuccessModal";
import ErrorModal from "@/app/Components/Modals/ErrorModal";

// This would normally come from a context or API
// For now, we'll use localStorage or pass via URL params
const getOptionLabel = (value: string, options: { value: string; label: string }[]): string => {
  return options.find((opt) => opt.value === value)?.label || value;
};

const courses = [
  { value: "bsit", label: "BS Information Technology" },
  { value: "bscs", label: "BS Computer Science" },
  { value: "bsce", label: "BS Computer Engineering" },
  { value: "bsee", label: "BS Electrical Engineering" },
];

const majors = [
  { value: "software", label: "Software Engineering" },
  { value: "networking", label: "Networking" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "data-science", label: "Data Science" },
];

const yearLevels = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const sections = [
  { value: "a", label: "Section A" },
  { value: "b", label: "Section B" },
  { value: "c", label: "Section C" },
  { value: "d", label: "Section D" },
];

const semesters = [
  { value: "1", label: "First Semester" },
  { value: "2", label: "Second Semester" },
  { value: "summer", label: "Summer" },
];

const departments = [
  { value: "cs", label: "Computer Science" },
  { value: "it", label: "Information Technology" },
  { value: "ce", label: "Computer Engineering" },
  { value: "ee", label: "Electrical Engineering" },
];

const subjects = [
  { value: "data-structures", label: "Data Structures and Algorithms" },
  { value: "database", label: "Database Management Systems" },
  { value: "web-dev", label: "Web Development" },
  { value: "networking", label: "Computer Networks" },
  { value: "software-eng", label: "Software Engineering" },
  { value: "os", label: "Operating Systems" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "cybersecurity", label: "Cybersecurity" },
];

const classifications = [
  { value: "academic", label: "Academic" },
  { value: "non-academic", label: "Non-Academic" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
];

const rooms = [
  { value: "room-101", label: "Room 101" },
  { value: "room-102", label: "Room 102" },
  { value: "room-201", label: "Room 201" },
  { value: "room-202", label: "Room 202" },
  { value: "room-301", label: "Room 301" },
  { value: "room-302", label: "Room 302" },
  { value: "lab-1", label: "Laboratory 1" },
  { value: "lab-2", label: "Laboratory 2" },
];

const weekdays = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

  const TakeAttendancePage = () => {
  const params = useParams();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("attendance");
  const [gracePeriod, setGracePeriod] = useState<string>("15"); // Default 15 minutes
  const [qrScanningEnabled, setQrScanningEnabled] = useState<boolean>(true);
  const [displayAbsent, setDisplayAbsent] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"attendance-form" | "attendee-list">("attendance-form");
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [scannedQrValue, setScannedQrValue] = useState<string>("");
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [isGracePeriodConfirmOpen, setIsGracePeriodConfirmOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<"qr" | "camera" | null>(null);
  const [isRegisterAttendeeModalOpen, setIsRegisterAttendeeModalOpen] = useState<boolean>(false);
  const [isProcessingOcr, setIsProcessingOcr] = useState<boolean>(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  
  // Extract enrollment key from params
  const enrollmentKey = Array.isArray(params.enrollmentKey) 
    ? params.enrollmentKey[0] 
    : params.enrollmentKey;
  
  const decodedEnrollmentKey = enrollmentKey ? decodeURIComponent(enrollmentKey) : null;

  // Fetch attendance room
  const { room: attendanceRecord, loading: roomLoading, error: roomError, refetch: refetchRoom } = useAttendanceRoom(decodedEnrollmentKey);
  
  // Fetch enrolled attendees
  const { attendees: enrolledAttendees, loading: attendeesLoading, error: attendeesError, refetch: refetchAttendees } = useEnrolledAttendees(attendanceRecord?.uuid || null);
  
  // Fetch attendance records for today
  const today = new Date().toISOString().split('T')[0];
  const { records: fetchedRecords, loading: recordsLoading, error: recordsError, refetch: refetchRecords } = useAttendanceRecords(attendanceRecord?.uuid || null, today);

  const [attendeeList, setAttendeeList] = useState<TableAttendanceRecord[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<TableAttendanceRecord[]>([]);

  // Update attendee list when enrolled attendees are fetched
  useEffect(() => {
    if (enrolledAttendees.length > 0) {
      setAttendeeList(enrolledAttendees);
    } else {
      setAttendeeList([]);
    }
  }, [enrolledAttendees]);

  // Update attendance records when fetched records change or displayAbsent changes
  useEffect(() => {
    // Start with fetched records (real records from backend)
    let records = [...fetchedRecords];
    
    if (displayAbsent && attendeeList.length > 0) {
      // Find attendees that are not in attendance records
      const missingAttendees = attendeeList.filter(
        (attendee) => !records.some((record) => record.studentNumber === attendee.studentNumber)
      );

      // Add missing attendees as absent (only in UI, not saved to backend)
      const absentRecords = missingAttendees.map((attendee) => ({
        ...attendee,
        id: `absent-${attendee.id}`,
        date: today,
        time: "",
        qr: "",
        signature: "",
        status: "absent" as const,
      }));

      // Combine real records with absent records
      records = [...records, ...absentRecords];
    }
    
    setAttendanceRecords(records);
  }, [fetchedRecords, displayAbsent, attendeeList, today]);

  const gracePeriodOptions = [
    { value: "0", label: "None" },
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "20", label: "20 minutes" },
    { value: "25", label: "25 minutes" },
    { value: "30", label: "30 minutes" },
  ];


  if (!attendanceRecord) {
    const enrollmentKey = Array.isArray(params.enrollmentKey) 
      ? params.enrollmentKey[0] 
      : params.enrollmentKey;
    
    return (
      <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
        <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">Record Not Found</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                The attendance record with enrollment key <strong>{enrollmentKey}</strong> could not be found.
              </p>
              <Button
                variant="primary"
                onClick={() => router.push("/attendance")}
                className="flex items-center gap-2"
              >
                <ArrowBackIcon className="w-5 h-5" />
                Back to Attendance
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isRegular = attendanceRecord.type === "regular";
  const regularData = isRegular ? (attendanceRecord.data as RegularAttendanceData) : null;
  const eventData = !isRegular ? (attendanceRecord.data as EventAttendanceData) : null;

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header with Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.push("/attendance")}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowBackIcon className="w-5 h-5" />
              Back to Attendance
            </Button>
            <Header title="Take Attendance" />
          </div>

          {/* Room Information Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Room Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Subject/Title */}
              <div className="flex items-start gap-3">
                <SchoolIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Subject</p>
                  <p className="text-foreground font-medium">
                    {isRegular
                      ? getOptionLabel(regularData!.subject, subjects)
                      : eventData!.agenda}
                  </p>
                </div>
              </div>

              {/* Room */}
              {isRegular && regularData && (
                <div className="flex items-start gap-3">
                  <LocationOnIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Room</p>
                    <p className="text-foreground font-medium">
                      {getOptionLabel(regularData.room, rooms)}
                    </p>
                  </div>
                </div>
              )}

              {/* Course/Major or Department */}
              {isRegular && regularData && (
                <div className="flex items-start gap-3">
                  <ClassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Course & Major</p>
                    <p className="text-foreground font-medium">
                      {getOptionLabel(regularData.course, courses)} - {getOptionLabel(regularData.major, majors)}
                    </p>
                  </div>
                </div>
              )}

              {!isRegular && eventData && (
                <div className="flex items-start gap-3">
                  <ClassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Department</p>
                    <p className="text-foreground font-medium">
                      {getOptionLabel(eventData.department, departments)}
                    </p>
                  </div>
                </div>
              )}

              {/* Year Level & Section (Regular only) */}
              {isRegular && regularData && (
                <div className="flex items-start gap-3">
                  <ClassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Class</p>
                    <p className="text-foreground font-medium">
                      {getOptionLabel(regularData.yearLevel, yearLevels)} - {getOptionLabel(regularData.section, sections)}
                    </p>
                  </div>
                </div>
              )}

              {/* Semester */}
              <div className="flex items-start gap-3">
                <CalendarTodayIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Semester</p>
                  <p className="text-foreground font-medium">
                    {isRegular
                      ? `${getOptionLabel(regularData!.semester, semesters)} ${regularData!.semesterYear}`
                      : `${getOptionLabel(eventData!.semester, semesters)} ${eventData!.semesterYear}`}
                  </p>
                </div>
              </div>

              {/* Schedule/Time */}
              {isRegular && regularData && regularData.selectedWeekdays.length > 0 && (
                <div className="flex items-start gap-3">
                  <AccessTimeIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Schedule</p>
                    <p className="text-foreground font-medium">
                      {regularData.selectedWeekdays
                        .map((day) => getOptionLabel(day, weekdays))
                        .join(", ")}
                    </p>
                    {regularData.startTime && regularData.endTime && (
                      <p className="text-foreground text-sm mt-1">
                        {formatTime(regularData.startTime)} - {formatTime(regularData.endTime)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {!isRegular && eventData && (
                <div className="flex items-start gap-3">
                  <AccessTimeIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Time</p>
                    <p className="text-foreground font-medium">
                      {formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}
                    </p>
                  </div>
                </div>
              )}

              {/* Classification (Regular only) */}
              {isRegular && regularData && (
                <div className="flex items-start gap-3">
                  <CategoryIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Classification</p>
                    <p className="text-foreground font-medium">
                      {getOptionLabel(regularData.classification, classifications)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attendance Taking Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            {/* Tabs */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-6">
              <button
                onClick={() => setActiveTab("attendance-form")}
                className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === "attendance-form"
                    ? "border-foreground text-foreground"
                    : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Attendance Form
              </button>
              <button
                onClick={() => setActiveTab("attendee-list")}
                className={`px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === "attendee-list"
                    ? "border-foreground text-foreground"
                    : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                }`}
              >
                Attendee List
              </button>
            </div>
            {/* Settings Section */}
            <div className="flex flex-col sm:justify-between sm:flex-row gap-4 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              {/* Grace Period and Form Buttons */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    <Select
                    label="Grace Period"
                    value={gracePeriod}
                    onChange={(e) => setGracePeriod(e.target.value)}
                    options={gracePeriodOptions}
                    disabled={activeTab === "attendee-list"}
                    className="w-fit min-w-[140px]"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                        console.log("Attendance Form clicked");
                        }}
                        disabled={activeTab === "attendee-list"}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors w-fit ${
                          activeTab === "attendee-list"
                            ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
                            : "text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                        title={activeTab === "attendee-list" ? "Switch to Attendance Form tab to use this" : "Attendance Form"}
                    >
                        <DescriptionIcon className="w-5 h-5" />
                        <span>Attendance Form</span>
                    </button>
                    <button
                        onClick={() => {
                        console.log("Distribution Form clicked");
                        }}
                        disabled={activeTab === "attendee-list"}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors w-fit ${
                          activeTab === "attendee-list"
                            ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
                            : "text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                        title={activeTab === "attendee-list" ? "Switch to Attendance Form tab to use this" : "Distribution Form"}
                    >
                        <AssignmentIcon className="w-5 h-5" />
                        <span>Distribution Form</span>
                    </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                 <div className="flex flex-col gap-2 items-end">    
                     <button
                         onClick={() => {
                         if (activeTab !== "attendee-list") {
                           setPendingAction("qr");
                           setIsGracePeriodConfirmOpen(true);
                         }
                         }}
                         disabled={activeTab === "attendee-list"}
                         className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                           activeTab === "attendee-list"
                             ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
                             : "text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                         }`}
                         title={activeTab === "attendee-list" ? "Switch to Attendance Form to use QR Scanning" : "QR Scanning"}
                     >
                         <QrCodeScannerIcon className="w-5 h-5" />
                         <span>QR Scanning</span>
                     </button>
                     <button
                         onClick={() => {
                         if (activeTab !== "attendee-list") {
                           setPendingAction("camera");
                           setIsGracePeriodConfirmOpen(true);
                         }
                         }}
                         disabled={activeTab === "attendee-list"}
                         className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                           activeTab === "attendee-list"
                             ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
                             : "text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                         }`}
                         title={activeTab === "attendee-list" ? "Switch to Attendance Form to use Camera" : "Camera"}
                     >
                         <CameraAltIcon className="w-5 h-5" />
                         <span>Camera</span>
                     </button>
                 </div>
                 <div className="flex flex-col gap-2 items-end">
                    <button
                        onClick={() => {
                          if (activeTab === "attendee-list") {
                            setIsRegisterAttendeeModalOpen(true);
                          }
                        }}
                        disabled={activeTab !== "attendee-list"}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === "attendee-list"
                            ? "text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            : "text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
                        }`}
                        title={activeTab === "attendee-list" ? "Register Attendee" : "Switch to Attendee List to add attendees"}
                    >
                        <PersonAddIcon className="w-5 h-5" />
                        <span>Register Attendee</span>
                    </button>
                     <button
                         onClick={() => {
                         setDisplayAbsent(!displayAbsent);
                         }}
                         disabled={activeTab === "attendee-list"}
                         className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                           activeTab === "attendee-list"
                             ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
                             : displayAbsent
                             ? "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
                             : "text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                         }`}
                         title={activeTab === "attendee-list" ? "Switch to Attendance Form to use Display Absent" : "Display Absent"}
                     >
                         <VisibilityOffIcon className="w-5 h-5" />
                         <span>Display Absent</span>
                     </button>
                 </div>

              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "attendance-form" && (
              <div>
                <AttendanceTable
                  records={attendanceRecords}
                  onRemove={async (id) => {
                    try {
                      // Check if it's an absent record (UI-only, starts with "absent-")
                      if (id.startsWith("absent-")) {
                        // Just remove from UI
                        setAttendanceRecords((prev) => prev.filter((r) => r.id !== id));
                        return;
                      }

                      // Delete from backend
                      await deleteAttendanceRecord(id);
                      
                      // Remove from UI
                      setAttendanceRecords((prev) => prev.filter((r) => r.id !== id));
                      
                      // Refresh records from backend
                      await refetchRecords();
                      
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
                  }}
                />
              </div>
            )}

            {activeTab === "attendee-list" && (
              <div>
                <AttendanceTable
                  records={attendeeList}
                  onRemove={async (id) => {
                    // Remove from UI immediately
                    setAttendeeList((prev) => prev.filter((r) => r.id !== id));
                    // Also remove from attendance records if it exists
                    setAttendanceRecords((prev) => prev.filter((r) => r.id !== id && r.id !== `absent-${id}`));
                    // TODO: Add API call to unenroll attendee if needed
                  }}
                  showQr={false}
                  showSignature={false}
                  showStatus={false}
                  showDate={false}
                  showTime={false}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* QR Code Scanning Modal */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => {
          setIsQrModalOpen(false);
          setScannedQrValue("");
        }}
        qrValue={scannedQrValue}
        onChange={(e) => {
          setScannedQrValue(e.target.value);
        }}
        onSubmit={async (tupcNumber) => {
          try {
            if (!attendanceRecord?.uuid) {
              throw new Error("No attendance room available");
            }

            // Find student by student number (TUPC number)
            let student = null;
            try {
              const studentResponse = await getStudentByStudentNumber(tupcNumber);
              if (studentResponse.success && studentResponse.student) {
                student = studentResponse.student;
              }
            } catch (error: any) {
              throw new Error(`Student with TUPC number ${tupcNumber} not found. Please register the student first.`);
            }

            if (!student) {
              throw new Error(`Student with TUPC number ${tupcNumber} not found. Please register the student first.`);
            }

            // Find or create attendee for this room
            let attendee = attendeeList.find(a => a.studentNumber === tupcNumber);
            
            if (!attendee) {
              // Create attendee for this room
              const attendeeResponse = await createAttendee({
                roomId: attendanceRecord.uuid,
                studentId: student.uuid,
                name: `${student.firstName}${student.middleName ? ` ${student.middleName}` : ''} ${student.surname}`.trim(),
                studentNumber: tupcNumber,
                sex: student.sex,
                type: 'student',
                status: 'active',
              });

              if (!attendeeResponse.success || !attendeeResponse.attendee) {
                throw new Error("Failed to create attendee for this room");
              }
              
              attendee = {
                id: attendeeResponse.attendee.uuid,
                name: attendeeResponse.attendee.name,
                sex: attendeeResponse.attendee.sex || 'other',
                studentNumber: tupcNumber,
                date: '',
                time: '',
                qr: '',
                signature: '',
                status: 'present',
              };
              
              // Refresh attendees list
              await refetchAttendees();
            }

            // Check if attendance already recorded for today
            const existingRecord = attendanceRecords.find(
              r => r.studentNumber === tupcNumber && r.date === today
            );

            if (existingRecord && !existingRecord.id.startsWith("absent-")) {
              throw new Error(`Attendance already recorded for ${attendee.name} today.`);
            }

            // Create attendance record
            const now = new Date();
            const time = now.toTimeString().slice(0, 5);
            const date = today;

            // Determine status based on grace period
            let status: 'present' | 'late' = 'present';
            const isRegular = attendanceRecord.type === "regular";
            const regularData = isRegular ? (attendanceRecord.data as RegularAttendanceData) : null;
            
            if (regularData?.startTime) {
              const [startHour, startMinute] = regularData.startTime.split(':').map(Number);
              const graceMinutes = parseInt(gracePeriod) || 0;
              const startTime = new Date();
              startTime.setHours(startHour, startMinute + graceMinutes, 0, 0);
              
              if (now > startTime) {
                status = 'late';
              }
            }

            await createAttendanceRecord({
              roomId: attendanceRecord.uuid,
              attendeeId: attendee.id,
              date: date,
              time: time,
              status: status,
              qrCode: tupcNumber,
            });

            // Refresh records
            await refetchRecords();
            
            // Close modal
            setIsQrModalOpen(false);
            setScannedQrValue("");
            
            // Show success modal
            setSuccessModal({
              isOpen: true,
              message: `Attendance recorded successfully for ${attendee.name} (${tupcNumber})`,
            });
          } catch (error: any) {
            console.error("Error processing QR/TUPC number:", error);
            setErrorModal({
              isOpen: true,
              message: error.message || "Failed to process TUPC number",
            });
          }
        }}
      />

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => {
          setIsCameraModalOpen(false);
          setCapturedImage("");
        }}
        onCapture={async (imageData) => {
          setCapturedImage(imageData);
          setIsProcessingOcr(true);
          setOcrError(null);
          
          try {
            if (!attendanceRecord?.uuid) {
              throw new Error("No attendance room available");
            }

            // Process image with OCR to extract TUPC number
            const tupcNumber = await processIdImage(imageData);
            
            if (!tupcNumber) {
              // Get the OCR text for debugging
              const ocrText = await extractTextFromImage(imageData);
              throw new Error(
                `Could not extract TUPC number from image.\n\n` +
                `OCR extracted text: "${ocrText.substring(0, 200)}"\n\n` +
                `Please ensure:\n` +
                `- The ID card is clear and well-lit\n` +
                `- The TUPC number (e.g., TUPC-20-1986) is visible\n` +
                `- The image is not blurry or rotated`
              );
            }

            // Find student by student number (TUP-C number)
            let student = null;
            try {
              const studentResponse = await getStudentByStudentNumber(tupcNumber);
              if (studentResponse.success && studentResponse.student) {
                student = studentResponse.student;
              }
            } catch (error: any) {
              throw new Error(`Student with TUP-C number ${tupcNumber} not found. Please register the student first.`);
            }

            if (!student) {
              throw new Error(`Student with TUP-C number ${tupcNumber} not found. Please register the student first.`);
            }

            // Find or create attendee for this room
            let attendee = attendeeList.find(a => a.studentNumber === tupcNumber);
            
            if (!attendee) {
              // Create attendee for this room
              const attendeeResponse = await createAttendee({
                roomId: attendanceRecord.uuid,
                studentId: student.uuid,
                name: `${student.firstName}${student.middleName ? ` ${student.middleName}` : ''} ${student.surname}`.trim(),
                studentNumber: tupcNumber,
                sex: student.sex,
                type: 'student',
                status: 'active',
              });

              if (!attendeeResponse.success || !attendeeResponse.attendee) {
                throw new Error("Failed to create attendee for this room");
              }
              
              attendee = {
                id: attendeeResponse.attendee.uuid,
                name: attendeeResponse.attendee.name,
                sex: attendeeResponse.attendee.sex || 'other',
                studentNumber: tupcNumber,
                date: '',
                time: '',
                qr: '',
                signature: '',
                status: 'present',
              };
              
              // Refresh attendees list
              await refetchAttendees();
            }

            // Check if attendance already recorded for today
            const existingRecord = attendanceRecords.find(
              r => r.studentNumber === tupcNumber && r.date === today
            );

            if (existingRecord && !existingRecord.id.startsWith("absent-")) {
              throw new Error(`Attendance already recorded for ${attendee.name} today.`);
            }

            // Create attendance record
            const now = new Date();
            const time = now.toTimeString().slice(0, 5);
            const date = today;

            // Determine status based on grace period
            let status: 'present' | 'late' = 'present';
            if (regularData?.startTime) {
              const [startHour, startMinute] = regularData.startTime.split(':').map(Number);
              const graceMinutes = parseInt(gracePeriod) || 0;
              const startTime = new Date();
              startTime.setHours(startHour, startMinute + graceMinutes, 0, 0);
              
              if (now > startTime) {
                status = 'late';
              }
            }

            await createAttendanceRecord({
              roomId: attendanceRecord.uuid,
              attendeeId: attendee.id,
              date: date,
              time: time,
              status: status,
              signature: imageData, // Store captured image as signature
            });

            // Refresh records
            await refetchRecords();
            
            // Close camera modal
            setIsCameraModalOpen(false);
            setCapturedImage("");
            
            // Show success modal
            setSuccessModal({
              isOpen: true,
              message: `Attendance recorded successfully for ${attendee.name} (${tupcNumber})`,
            });
          } catch (error: any) {
            console.error("Error processing camera capture:", error);
            setOcrError(error.message || "Failed to process ID image");
          } finally {
            setIsProcessingOcr(false);
          }
        }}
        isProcessing={isProcessingOcr}
        processingError={ocrError}
      />

      {/* Grace Period Confirmation Modal */}
      <ConfirmationModal
        isOpen={isGracePeriodConfirmOpen}
        onClose={() => {
          setIsGracePeriodConfirmOpen(false);
          setPendingAction(null);
        }}
        onConfirm={() => {
          if (pendingAction === "qr") {
            setIsQrModalOpen(true);
          } else if (pendingAction === "camera") {
            setIsCameraModalOpen(true);
          }
          setIsGracePeriodConfirmOpen(false);
          setPendingAction(null);
        }}
        title="Confirm Grace Period"
        message="Did you set the grace period already? This will affect the status of the student."
        icon={<AccessTimeIcon className="w-6 h-6" />}
        confirmLabel="Yes, Proceed"
        cancelLabel="Cancel"
      />

      {/* Register Attendee Modal */}
      <RegisterAttendeeModal
        isOpen={isRegisterAttendeeModalOpen}
        onClose={() => setIsRegisterAttendeeModalOpen(false)}
        onRegister={async (data: AttendeeData) => {
          try {
            if (!attendanceRecord?.uuid) {
              throw new Error("No room UUID available");
            }

            const fullName = `${data.firstName}${data.middleName ? ` ${data.middleName}` : ""} ${data.surname}`.trim();
            
            // First, check if student already exists in the Student table (created by admin)
            let student = null;
            let isExistingStudent = false;
            
            try {
              const studentResponse = await getStudentByStudentNumber(data.studentNumber);
              if (studentResponse.success && studentResponse.student) {
                // Student exists - use their data
                student = studentResponse.student;
                isExistingStudent = true;
              }
            } catch (error: any) {
              // Student not found - this is okay, we'll create a basic attendee without student reference
              if (!error.message || !error.message.includes("not found")) {
                console.warn("Error checking for student:", error);
              }
            }

            // Create attendee for this room
            // If student exists, link to student; otherwise create basic attendee
            const attendeeResponse = await createAttendee({
              roomId: attendanceRecord.uuid,
              studentId: student?.uuid, // Link to student if exists
              name: student ? `${student.firstName}${student.middleName ? ` ${student.middleName}` : ''} ${student.surname}`.trim() : fullName,
              studentNumber: data.studentNumber,
              sex: student ? student.sex : data.sex,
              type: 'student',
              status: 'active',
            });

            if (!attendeeResponse.success || !attendeeResponse.attendee) {
              throw new Error(attendeeResponse.message || "Failed to create attendee");
            }
            
            const attendee = attendeeResponse.attendee;
            const isAlreadyEnrolled = attendeeList.some(a => a.id === attendee.uuid);

            // Refresh attendees list
            await refetchAttendees();

            // If display absent is enabled, also add to attendance records as absent
            if (displayAbsent) {
              const absentRecord: TableAttendanceRecord = {
                id: `absent-${attendee.uuid}`,
                name: attendee.name,
                sex: attendee.sex || data.sex,
                studentNumber: attendee.studentNumber || data.studentNumber,
                date: today,
                time: "",
                qr: "",
                signature: "",
                status: "absent" as const,
              };
              setAttendanceRecords((prev) => [...prev, absentRecord]);
            }

            // Show success message
            const attendeeName = attendee.student 
              ? `${attendee.student.firstName}${attendee.student.middleName ? ` ${attendee.student.middleName}` : ''} ${attendee.student.surname}`.trim()
              : attendee.name;
            
            const message = isAlreadyEnrolled
              ? `${attendeeName} is already enrolled in this room.`
              : isExistingStudent
              ? `Student ${attendeeName} enrolled successfully! (Using existing student record with course: ${student?.course}, year level: ${student?.yearLevel}, section: ${student?.section})`
              : `Attendee ${attendeeName} registered and enrolled successfully!`;
            
            setSuccessModal({
              isOpen: true,
              message,
            });
          } catch (error: any) {
            console.error("Error registering attendee:", error);
            setErrorModal({
              isOpen: true,
              message: error.message || "Failed to register attendee",
            });
          }
        }}
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
};

export default TakeAttendancePage;


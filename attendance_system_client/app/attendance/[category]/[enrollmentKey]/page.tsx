"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import Button from "@/app/Components/Buttons/Button";
import Input from "@/app/Components/Fields/Input";
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
import { AttendanceRecord } from "@/app/attendance/page";
import { RegularAttendanceData } from "@/app/Components/Modals/AddRegularAttendanceModal";
import { EventAttendanceData } from "@/app/Components/Modals/AddEventAttendanceModal";
import AttendanceTable, { AttendanceRecord as TableAttendanceRecord } from "@/app/Components/Tables/AttendanceTable";
import QrCodeModal from "@/app/Components/Modals/QrCodeModal";
import CameraModal from "@/app/Components/Modals/CameraModal";
import ConfirmationModal from "@/app/Components/Modals/ConfirmationModal";
import RegisterAttendeeModal, { AttendeeData } from "@/app/Components/Modals/RegisterAttendeeModal";
import { getAttendanceRoomByEnrollmentKey } from "@/app/ApiClient/attendance/attendanceRooms";

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

export default function TakeAttendancePage() {
  const params = useParams();
  const router = useRouter();
  const [attendanceRecord, setAttendanceRecord] = useState<AttendanceRecord | null>(null);
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
  
  // Sample attendee list (registered attendees)
  const initialAttendeeList: TableAttendanceRecord[] = [
    {
      id: "attendee-1",
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
      id: "attendee-2",
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
      id: "attendee-3",
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
      id: "attendee-4",
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
      id: "attendee-5",
      name: "Robert Brown",
      sex: "male",
      studentNumber: "2024-005",
      date: "",
      time: "",
      qr: "",
      signature: "",
      status: "present",
    },
    {
      id: "attendee-6",
      name: "Emily Davis",
      sex: "female",
      studentNumber: "2024-006",
      date: "",
      time: "",
      qr: "",
      signature: "",
      status: "present",
    },
  ];

  // Sample attendance records data (actual attendance taken)
  const initialAttendanceRecords: TableAttendanceRecord[] = [
    {
      id: "1",
      name: "John Doe",
      sex: "male",
      studentNumber: "2024-001",
      date: new Date().toLocaleDateString(),
      time: "08:30 AM",
      qr: "QR-ABC123XYZ789DEF456",
      signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRvZTwvdGV4dD48L3N2Zz4=",
      status: "present",
    },
    {
      id: "2",
      name: "Jane Smith",
      sex: "female",
      studentNumber: "2024-002",
      date: new Date().toLocaleDateString(),
      time: "08:45 AM",
      qr: "QR-XYZ789ABC123DEF456",
      signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNtaXRoPC90ZXh0Pjwvc3ZnPg==",
      status: "present",
    },
    {
      id: "3",
      name: "Michael Johnson",
      sex: "male",
      studentNumber: "2024-003",
      date: new Date().toLocaleDateString(),
      time: "09:15 AM",
      qr: "QR-DEF456XYZ789ABC123",
      signature: "",
      status: "late",
    },
    {
      id: "4",
      name: "Sarah Williams",
      sex: "female",
      studentNumber: "2024-004",
      date: new Date().toLocaleDateString(),
      time: "08:25 AM",
      qr: "QR-123ABC456DEF789XYZ",
      signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldpbGxpYW1zPC90ZXh0Pjwvc3ZnPg==",
      status: "present",
    },
    {
      id: "5",
      name: "Robert Brown",
      sex: "male",
      studentNumber: "2024-005",
      date: new Date().toLocaleDateString(),
      time: "",
      qr: "",
      signature: "",
      status: "absent",
    },
  ];

  const [attendeeList, setAttendeeList] = useState<TableAttendanceRecord[]>(initialAttendeeList);
  const [attendanceRecords, setAttendanceRecords] = useState<TableAttendanceRecord[]>(initialAttendanceRecords);

  // Effect to handle Display Absent functionality
  useEffect(() => {
    if (displayAbsent) {
      // Find attendees that are not in attendance records
      const missingAttendees = attendeeList.filter(
        (attendee) => !attendanceRecords.some((record) => record.studentNumber === attendee.studentNumber)
      );

      // Add missing attendees as absent
      const absentRecords = missingAttendees.map((attendee) => ({
        ...attendee,
        id: `absent-${attendee.id}`,
        date: new Date().toLocaleDateString(),
        time: "",
        qr: "",
        signature: "",
        status: "absent" as const,
      }));

      // Add absent records that don't already exist
      setAttendanceRecords((prev) => {
        const existingAbsentIds = prev
          .filter((r) => r.id.startsWith("absent-"))
          .map((r) => r.id.replace("absent-", ""));
        const newAbsentRecords = absentRecords.filter(
          (r) => !existingAbsentIds.includes(r.id.replace("absent-", ""))
        );
        return [...prev, ...newAbsentRecords];
      });
    } else {
      // Remove all absent records when display absent is disabled
      setAttendanceRecords((prev) => prev.filter((r) => !r.id.startsWith("absent-")));
    }
  }, [displayAbsent, attendeeList]);

  const gracePeriodOptions = [
    { value: "0", label: "None" },
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "20", label: "20 minutes" },
    { value: "25", label: "25 minutes" },
    { value: "30", label: "30 minutes" },
  ];

  // Debug: Log route params
  useEffect(() => {
    console.log("Route params received:", params);
    console.log("Category:", params.category);
    console.log("EnrollmentKey:", params.enrollmentKey);
  }, [params]);

  useEffect(() => {
    // Get attendance record from database using enrollmentKey
    const loadRoom = async () => {
      let enrollmentKey = Array.isArray(params.enrollmentKey) 
        ? params.enrollmentKey[0] 
        : params.enrollmentKey;
      
      // Decode the enrollmentKey from URL
      if (enrollmentKey) {
        enrollmentKey = decodeURIComponent(enrollmentKey);
      }
      
      console.log("Route params:", params);
      console.log("Extracted enrollmentKey:", enrollmentKey);
      
      if (!enrollmentKey) {
        console.error("Enrollment key is missing from URL");
        return;
      }

      try {
        const response = await getAttendanceRoomByEnrollmentKey(enrollmentKey);
        if (response.success && response.room) {
          const record: AttendanceRecord = {
            uuid: response.room.uuid,
            enrollmentKey: response.room.enrollmentKey,
            type: response.room.type,
            data: response.room.data,
            category: response.room.category,
            createdAt: response.room.createdAt ? new Date(response.room.createdAt) : new Date(),
          };
          setAttendanceRecord(record);
        } else {
          console.error("Record not found for enrollmentKey:", enrollmentKey);
        }
      } catch (error) {
        console.error("Error loading attendance room:", error);
      }
    };

    loadRoom();
  }, [params.enrollmentKey]);

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
                      : eventData!.subject}
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

              {/* Classification */}
              <div className="flex items-start gap-3">
                <CategoryIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Classification</p>
                  <p className="text-foreground font-medium">
                    {isRegular
                      ? getOptionLabel(regularData!.classification, classifications)
                      : getOptionLabel(eventData!.classification, classifications)}
                  </p>
                </div>
              </div>
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
                  onRemove={(id) => {
                    setAttendanceRecords((prev) => prev.filter((r) => r.id !== id));
                  }}
                />
              </div>
            )}

            {activeTab === "attendee-list" && (
              <div>
                <AttendanceTable
                  records={attendeeList}
                  onRemove={(id) => {
                    setAttendeeList((prev) => prev.filter((r) => r.id !== id));
                    // Also remove from attendance records if it exists
                    setAttendanceRecords((prev) => prev.filter((r) => r.id !== id && r.id !== `absent-${id}`));
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
      />

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => {
          setIsCameraModalOpen(false);
          setCapturedImage("");
        }}
        onCapture={(imageData) => {
          setCapturedImage(imageData);
          console.log("Image captured:", imageData);
        }}
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
        onRegister={(data: AttendeeData) => {
          // Create attendee record from form data
          const fullName = `${data.firstName}${data.middleName ? ` ${data.middleName}` : ""} ${data.surname}`.trim();
          const newAttendee: TableAttendanceRecord = {
            id: `attendee-${Date.now()}`,
            name: fullName,
            sex: data.sex,
            studentNumber: data.studentNumber,
            date: "",
            time: "",
            qr: "",
            signature: "",
            status: "present",
          };
          
          setAttendeeList((prev) => [...prev, newAttendee]);
          
          // If display absent is enabled, also add to attendance records as absent
          if (displayAbsent) {
            const absentRecord: TableAttendanceRecord = {
              ...newAttendee,
              id: `absent-${newAttendee.id}`,
              status: "absent" as const,
            };
            setAttendanceRecords((prev) => [...prev, absentRecord]);
          }
        }}
      />
    </div>
  );
}


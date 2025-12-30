"use client";

import { useState, useEffect } from "react";
import MainSidebar from "@/app/Components/Sidebars/MainSidebar";
import Header from "@/app/Components/Headers/Header";
import Button from "@/app/Components/Buttons/Button";
import Select from "@/app/Components/Fields/Select";
import Input from "@/app/Components/Fields/Input";
import AttendanceTable, { AttendanceRecord } from "@/app/Components/Tables/AttendanceTable";
import Tabs from "@/app/Components/Tabs/Tabs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useAuth } from "@/app/Contexts/AuthContext";
import { filterRecords, FilterCriteria } from "@/app/Utils/filterUtils";

// Sample records data (attendance records with dates)
const initialRecords: AttendanceRecord[] = [
  {
    id: "record-1",
    name: "John Doe",
    sex: "male",
    studentNumber: "2024-001",
    date: "2024-01-15",
    time: "08:30 AM",
    qr: "QR-ABC123XYZ789DEF456",
    signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRvZTwvdGV4dD48L3N2Zz4=",
    status: "present",
  },
  {
    id: "record-2",
    name: "Jane Smith",
    sex: "female",
    studentNumber: "2024-002",
    date: "2024-01-15",
    time: "08:45 AM",
    qr: "QR-XYZ789ABC123DEF456",
    signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNtaXRoPC90ZXh0Pjwvc3ZnPg==",
    status: "present",
  },
  {
    id: "record-3",
    name: "Michael Johnson",
    sex: "male",
    studentNumber: "2024-003",
    date: "2024-01-15",
    time: "09:15 AM",
    qr: "QR-DEF456XYZ789ABC123",
    signature: "",
    status: "late",
  },
  {
    id: "record-4",
    name: "Sarah Williams",
    sex: "female",
    studentNumber: "2024-004",
    date: "2024-01-16",
    time: "08:30 AM",
    qr: "QR-GHI789JKL012MNO345",
    signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCIgeT0iMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldpbGxpYW1zPC90ZXh0Pjwvc3ZnPg==",
    status: "present",
  },
  {
    id: "record-5",
    name: "David Brown",
    sex: "male",
    studentNumber: "2024-005",
    date: "2024-01-16",
    time: "",
    qr: "",
    signature: "",
    status: "absent",
  },
];

const classifications = [
  { value: "", label: "All Classifications" },
  { value: "academic", label: "Academic" },
  { value: "non-academic", label: "Non-Academic" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
];

const subjects = [
  { value: "", label: "All Subjects" },
  { value: "data-structures", label: "Data Structures and Algorithms" },
  { value: "database", label: "Database Management Systems" },
  { value: "web-dev", label: "Web Development" },
  { value: "networking", label: "Computer Networks" },
  { value: "software-eng", label: "Software Engineering" },
  { value: "os", label: "Operating Systems" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "cybersecurity", label: "Cybersecurity" },
];

function RecordsPageContent() {
  const [activeMenu, setActiveMenu] = useState("records");
  const [activeTab, setActiveTab] = useState("attendance-records");
  const { user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>(initialRecords);
  
  // Filter states
  const [classification, setClassification] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Define tabs - Student Record only for admin
  const tabs = [
    { id: "attendance-records", label: "Attendance Records" },
    ...(user?.role === 'admin' ? [{ id: "student-records", label: "Student Records" }] : []),
  ];

  const handleShow = () => {
    // Validate that required filters are filled
    if (!classification || !subject || !date) {
      return;
    }

    // Apply filters using utility function
    const filters: FilterCriteria = {
      classification,
      subject,
      date,
      searchQuery,
    };

    const filtered = filterRecords(records, filters);
    setFilteredRecords(filtered);
  };

  // Real-time search functionality - filters as user types
  useEffect(() => {
    // Apply filters automatically when search query or other filters change
    const filters: FilterCriteria = {
      classification,
      subject,
      date,
      searchQuery,
    };

    const filtered = filterRecords(records, filters);
    setFilteredRecords(filtered);
  }, [searchQuery, classification, subject, date, records]);

  const handleRemove = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setFilteredRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <MainSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Header title="Records" />

          {/* Filters Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>
            <div className="flex justify-between items-end gap-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                  label="Classification"
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  options={classifications}
                  disabled={activeTab === "student-records"}
                />
                <Select
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  options={subjects}
                  disabled={activeTab === "student-records"}
                />
                <Input
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={activeTab === "student-records"}
                />
              </div>
              
              <div className="w-fit">
                <Button
                  variant="primary"
                  onClick={handleShow}
                  className="flex items-center gap-2"
                  disabled={activeTab === "student-records" || !classification || !subject || !date}
                >
                  Generate List
                </Button>
              </div>
            </div>
            <div className="w-fit mt-5">
                <Input
                  label="Search Student"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or student number"
                />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Tab Content */}
          {activeTab === "attendance-records" && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Records</h2>
              <AttendanceTable
                records={filteredRecords}
                onRemove={handleRemove}
                showQr={true}
                showSignature={true}
                showStatus={true}
                showDate={true}
                showTime={true}
              />
            </div>
          )}

          {activeTab === "student-records" && user?.role === 'admin' && (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Student Records</h2>
              <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                <p>Student Records content will be displayed here</p>
                <p className="text-sm mt-2">This is an admin-only view</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function RecordsPage() {
  return (
    <ProtectedRoute>
      <RecordsPageContent />
    </ProtectedRoute>
  );
}


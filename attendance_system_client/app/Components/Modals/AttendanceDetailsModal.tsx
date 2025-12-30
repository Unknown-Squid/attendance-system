"use client";

import React from "react";
import Modal from "./Modal";
import { RegularAttendanceData } from "@/app/Components/Modals/AddRegularAttendanceModal";
import { EventAttendanceData } from "@/app/Components/Modals/AddEventAttendanceModal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClassIcon from "@mui/icons-material/Class";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";

interface AttendanceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RegularAttendanceData | EventAttendanceData;
  type: "regular" | "event";
}

const getOptionLabel = (value: string, options: { value: string; label: string }[]): string => {
  return options.find((opt) => opt.value === value)?.label || value;
};

const weekdays = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

export default function AttendanceDetailsModal({
  isOpen,
  onClose,
  data,
  type,
}: AttendanceDetailsModalProps) {
  const isRegular = type === "regular";
  const regularData = isRegular ? (data as RegularAttendanceData) : null;
  const eventData = !isRegular ? (data as EventAttendanceData) : null;

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

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isRegular ? "Regular Attendance Details" : "Event Attendance Details"}
    >
      <div className="space-y-6">
        {/* Subject/Title */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            {isRegular
              ? getOptionLabel(regularData!.subject, subjects)
              : eventData!.agenda}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isRegular
              ? `${getOptionLabel(regularData!.course, courses)} - ${getOptionLabel(regularData!.major, majors)}`
              : `Department: ${getOptionLabel(eventData!.department, departments)}`}
          </p>
        </div>

        {/* Regular Attendance Details */}
        {isRegular && regularData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <ClassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Year Level</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(regularData.yearLevel, yearLevels)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Section</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(regularData.section, sections)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarTodayIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Semester</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(regularData.semester, semesters)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarTodayIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Semester Year</p>
                <p className="text-foreground font-medium">{regularData.semesterYear}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <SchoolIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Subject</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(regularData.subject, subjects)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <LocationOnIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Room</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(regularData.room, rooms)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CategoryIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Classification</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(regularData.classification, classifications)}
                </p>
              </div>
            </div>

            {regularData.selectedWeekdays.length > 0 && (
              <div className="flex items-start gap-3">
                <AccessTimeIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Schedule</p>
                  <p className="text-foreground font-medium mb-2">
                    {regularData.selectedWeekdays
                      .map((day) => getOptionLabel(day, weekdays))
                      .join(", ")}
                  </p>
                  {regularData.startTime && regularData.endTime && (
                    <p className="text-foreground text-sm">
                      {formatTime(regularData.startTime)} - {formatTime(regularData.endTime)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Event Attendance Details */}
        {!isRegular && eventData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <SchoolIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Agenda</p>
                <p className="text-foreground font-medium">{eventData.agenda}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarTodayIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Semester</p>
                <p className="text-foreground font-medium">
                  {getOptionLabel(eventData.semester, semesters)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarTodayIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Semester Year</p>
                <p className="text-foreground font-medium">{eventData.semesterYear}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AccessTimeIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Time</p>
                <p className="text-foreground font-medium">
                  {formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </Modal>
  );
}


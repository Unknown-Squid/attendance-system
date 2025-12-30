"use client";

import React, { useState } from "react";
import { RegularAttendanceData } from "@/app/Components/Modals/AddRegularAttendanceModal";
import { EventAttendanceData } from "@/app/Components/Modals/AddEventAttendanceModal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import AttendanceDetailsModal from "@/app/Components/Modals/AttendanceDetailsModal";

interface AttendanceCardProps {
  data: RegularAttendanceData | EventAttendanceData;
  type: "regular" | "event";
  category?: "regular-class" | "workshop" | "examination" | "event" | "archive";
  onTakeAttendance?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
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

export default function AttendanceCard({ data, type, category, onTakeAttendance, onDelete, onArchive }: AttendanceCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const isRegular = type === "regular";
  const regularData = isRegular ? (data as RegularAttendanceData) : null;
  const eventData = !isRegular ? (data as EventAttendanceData) : null;

  const courses = [
    { value: "bsit", label: "BSIT" },
    { value: "bscs", label: "BSCS" },
    { value: "bsce", label: "BSCE" },
    { value: "bsee", label: "BSEE" },
  ];

  const majors = [
    { value: "software", label: "Software Eng" },
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
    { value: "1", label: "1st Sem" },
    { value: "2", label: "2nd Sem" },
    { value: "summer", label: "Summer" },
  ];

  const departments = [
    { value: "cs", label: "CS" },
    { value: "it", label: "IT" },
    { value: "ce", label: "CE" },
    { value: "ee", label: "EE" },
  ];

  const subjects = [
    { value: "data-structures", label: "Data Structures" },
    { value: "database", label: "Database" },
    { value: "web-dev", label: "Web Dev" },
    { value: "networking", label: "Networking" },
    { value: "software-eng", label: "Software Eng" },
    { value: "os", label: "OS" },
    { value: "ai", label: "AI" },
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
    { value: "lab-1", label: "Lab 1" },
    { value: "lab-2", label: "Lab 2" },
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
    <>
      <div className="aspect-square bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground truncate">
                {isRegular
                  ? getOptionLabel(regularData!.subject, subjects)
                  : eventData!.agenda}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {isRegular
                  ? `${getOptionLabel(regularData!.course, courses)} - ${getOptionLabel(regularData!.major, majors)}`
                  : getOptionLabel(eventData!.department, departments)}
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {category !== "archive" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive?.();
                  }}
                  className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                  title="Archive"
                >
                  <ArchiveIcon className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                title="Delete"
              >
                <DeleteIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Content */}
        <div className="flex-1 flex flex-col justify-center">
          {isRegular && regularData && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AccessTimeIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="text-sm text-foreground">
                  {regularData.selectedWeekdays.length > 0
                    ? regularData.selectedWeekdays
                        .map((day) => {
                          const weekday = weekdays.find((w) => w.value === day);
                          return weekday ? weekday.label.substring(0, 3) : day;
                        })
                        .join(", ")
                    : "No schedule"}
                </p>
              </div>
              {regularData.startTime && regularData.endTime && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 ml-6">
                  {formatTime(regularData.startTime)} - {formatTime(regularData.endTime)}
                </p>
              )}
            </div>
          )}

          {!isRegular && eventData && (
            <div className="flex items-center gap-2">
              <AccessTimeIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <p className="text-sm text-foreground">
                {formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="w-full py-2 px-4 border border-zinc-300 dark:border-zinc-700 text-foreground rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
          >
            View More
          </button>
          {category !== "archive" && (
            <button
              onClick={onTakeAttendance}
              className="w-full py-2 px-4 bg-foreground text-background rounded-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors text-sm font-medium"
            >
              Take Attendance
            </button>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <AttendanceDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        data={data}
        type={type}
      />
    </>
  );
}


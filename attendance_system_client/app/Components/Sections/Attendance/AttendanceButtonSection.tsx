"use client";

import React from "react";
import Button from "@/app/Components/Fields/Buttons";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";

interface AttendanceButtonSectionProps {
  isAdmin: boolean;
  setIsRegularModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceButtonSection = ({
  isAdmin,
  setIsRegularModalOpen,
  setIsEventModalOpen,
}: AttendanceButtonSectionProps) => {
  return (
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
  );
};

export default AttendanceButtonSection;


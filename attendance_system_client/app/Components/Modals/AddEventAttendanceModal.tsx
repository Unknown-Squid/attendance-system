"use client";

import { useState } from "react";
import Modal from "./Modal";
import Input from "@/app/Components/Fields/Input";
import Select from "@/app/Components/Fields/Select";
import Button from "@/app/Components/Buttons/Button";
import { validateTimeRange } from "@/app/Utils/timeValidation";

interface AddEventAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: EventAttendanceData) => void;
}

export interface EventAttendanceData {
  agenda: string;
  startTime: string;
  endTime: string;
  department: string;
  semester: string;
  semesterYear: string;
}

export default function AddEventAttendanceModal({
  isOpen,
  onClose,
  onSubmit,
}: AddEventAttendanceModalProps) {
  const [formData, setFormData] = useState<EventAttendanceData>({
    agenda: "",
    startTime: "",
    endTime: "",
    department: "",
    semester: "",
    semesterYear: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventAttendanceData, string>>>({});

  const departments = [
    { value: "cs", label: "Computer Science" },
    { value: "it", label: "Information Technology" },
    { value: "ce", label: "Computer Engineering" },
    { value: "ee", label: "Electrical Engineering" },
  ];

  const semesters = [
    { value: "1", label: "First Semester" },
    { value: "2", label: "Second Semester" },
    { value: "summer", label: "Summer" },
  ];

  const semesterYears = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let newData = { ...prev, [name]: value };
      
      // If start time changes, reset end time if it exists
      if (name === "startTime") {
        if (prev.endTime) {
          const timeValidation = validateTimeRange(value, prev.endTime);
          if (!timeValidation.isValid) {
            newData = { ...newData, endTime: "" };
            setErrors((prev) => ({
              ...prev,
              endTime: "End time was reset. Please select a valid end time after start time.",
              startTime: undefined,
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              endTime: undefined,
              startTime: undefined,
            }));
          }
        } else {
          setErrors((prev) => ({
            ...prev,
            startTime: undefined,
          }));
        }
      }
      // Validate time range when end time changes
      else if (name === "endTime") {
        if (!prev.startTime) {
          setErrors((prev) => ({
            ...prev,
            endTime: "Please select start time first",
          }));
          newData = { ...newData, endTime: "" };
        } else {
          const timeValidation = validateTimeRange(prev.startTime, value);
          if (!timeValidation.isValid) {
            setErrors((prev) => ({
              ...prev,
              endTime: timeValidation.error,
            }));
            newData = { ...newData, endTime: "" };
          } else {
            setErrors((prev) => ({
              ...prev,
              endTime: undefined,
            }));
          }
        }
      } else {
        // Clear error for other fields when user starts typing
        if (errors[name as keyof EventAttendanceData]) {
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
      }
      
      return newData;
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EventAttendanceData, string>> = {};

    if (!formData.agenda.trim()) {
      newErrors.agenda = "Agenda is required";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }
    
    // Validate time range using utility function
    if (formData.startTime && formData.endTime) {
      const timeValidation = validateTimeRange(formData.startTime, formData.endTime);
      if (!timeValidation.isValid) {
        newErrors.endTime = timeValidation.error;
      }
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }
    if (!formData.semesterYear) {
      newErrors.semesterYear = "Semester year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit?.(formData);
      // Reset form
      setFormData({
        agenda: "",
        startTime: "",
        endTime: "",
        department: "",
        semester: "",
        semesterYear: "",
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      agenda: "",
      startTime: "",
      endTime: "",
      department: "",
      semester: "",
      semesterYear: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Event Attendance">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Agenda"
          name="agenda"
          type="text"
          value={formData.agenda}
          onChange={handleChange}
          error={errors.agenda}
          placeholder="Enter meeting agenda"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Time"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            error={errors.startTime}
          />

          <Input
            label="End Time"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            error={errors.endTime}
            disabled={!formData.startTime}
          />
        </div>

        <Select
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          options={departments}
          error={errors.department}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            options={semesters}
            error={errors.semester}
          />

          <Select
            label="Semester Year"
            name="semesterYear"
            value={formData.semesterYear}
            onChange={handleChange}
            options={semesterYears}
            error={errors.semesterYear}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Event
          </Button>
        </div>
      </form>
    </Modal>
  );
}


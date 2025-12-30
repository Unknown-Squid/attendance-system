"use client";

import { useState } from "react";
import Modal from "./Modal";
import Input from "@/app/Components/Fields/Input";
import Select from "@/app/Components/Fields/Select";
import Button from "@/app/Components/Buttons/Button";
import { validateTimeRange } from "@/app/Utils/timeValidation";

interface AddRegularAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegularAttendanceData) => void;
}

export interface RegularAttendanceData {
  course: string;
  major: string;
  yearLevel: string;
  section: string;
  semester: string;
  semesterYear: string;
  subject: string;
  classification: string;
  room: string;
  selectedWeekdays: string[];
  startTime: string;
  endTime: string;
}

const weekdays = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

export default function AddRegularAttendanceModal({
  isOpen,
  onClose,
  onSubmit,
}: AddRegularAttendanceModalProps) {
  const [formData, setFormData] = useState<RegularAttendanceData>({
    course: "",
    major: "",
    yearLevel: "",
    section: "",
    semester: "",
    semesterYear: "",
    subject: "",
    classification: "",
    room: "",
    selectedWeekdays: [],
    startTime: "",
    endTime: "",
  });

  const [errors, setErrors] = useState<{
    course?: string;
    major?: string;
    yearLevel?: string;
    section?: string;
    semester?: string;
    semesterYear?: string;
    subject?: string;
    classification?: string;
    room?: string;
    selectedWeekdays?: string;
    startTime?: string;
    endTime?: string;
  }>({});

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

  const semesterYears = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const classifications = [
    { value: "academic", label: "Academic" },
    { value: "non-academic", label: "Non-Academic" },
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
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
        if (errors[name as keyof typeof errors]) {
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
      }
      
      return newData;
    });
  };

  const handleWeekdayToggle = (weekday: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedWeekdays.includes(weekday);
      const newWeekdays = isSelected
        ? prev.selectedWeekdays.filter((day) => day !== weekday)
        : [...prev.selectedWeekdays, weekday];
      return { ...prev, selectedWeekdays: newWeekdays };
    });
    // Clear error when user toggles
    if (errors.selectedWeekdays) {
      setErrors((prev) => ({ ...prev, selectedWeekdays: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.course) {
      newErrors.course = "Course is required";
    }
    if (!formData.major) {
      newErrors.major = "Major is required";
    }
    if (!formData.yearLevel) {
      newErrors.yearLevel = "Year level is required";
    }
    if (!formData.section) {
      newErrors.section = "Section is required";
    }
    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }
    if (!formData.semesterYear) {
      newErrors.semesterYear = "Semester year is required";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.classification) {
      newErrors.classification = "Classification is required";
    }
    if (!formData.room) {
      newErrors.room = "Room is required";
    }

    // Validate schedule (optional, but if weekdays are selected or times are set, all must be complete)
    if (formData.selectedWeekdays.length > 0 || formData.startTime || formData.endTime) {
      if (formData.selectedWeekdays.length === 0) {
        newErrors.selectedWeekdays = "At least one weekday must be selected";
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
        course: "",
        major: "",
        yearLevel: "",
        section: "",
        semester: "",
        semesterYear: "",
        subject: "",
        classification: "",
        room: "",
        selectedWeekdays: [],
        startTime: "",
        endTime: "",
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      course: "",
      major: "",
      yearLevel: "",
      section: "",
      semester: "",
      semesterYear: "",
      subject: "",
      classification: "",
      room: "",
      selectedWeekdays: [],
      startTime: "",
      endTime: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Regular Attendance">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Class Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              options={courses}
              error={errors.course}
            />

            <Select
              label="Major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              options={majors}
              error={errors.major}
            />

            <Select
              label="Year Level"
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
              options={yearLevels}
              error={errors.yearLevel}
            />

            <Select
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              options={sections}
              error={errors.section}
            />
          </div>

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

          <Select
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            options={subjects}
            error={errors.subject}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Classification"
              name="classification"
              value={formData.classification}
              onChange={handleChange}
              options={classifications}
              error={errors.classification}
            />

            <Select
              label="Room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              options={rooms}
              error={errors.room}
            />
          </div>
        </div>

        {/* Schedule Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-zinc-200 dark:border-zinc-800 pb-2">
            Weekly Schedule (Optional)
          </h3>
          
          {/* Weekday Checkboxes */}
          <div>
            <label className="block text-sm font-medium mb-3 text-foreground">
              Select Weekdays
            </label>
            <div className="flex flex-wrap gap-4">
              {weekdays.map((day) => (
                <label
                  key={day.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedWeekdays.includes(day.value)}
                    onChange={() => handleWeekdayToggle(day.value)}
                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-foreground focus:ring-2 focus:ring-foreground/20"
                  />
                  <span className="text-sm text-foreground">{day.label}</span>
                </label>
              ))}
            </div>
            {errors.selectedWeekdays && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.selectedWeekdays}
              </p>
            )}
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Time"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              error={errors.startTime}
            />

            <Input
              label="End Time"
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              error={errors.endTime}
              disabled={!formData.startTime}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Regular Attendance
          </Button>
        </div>
      </form>
    </Modal>
  );
}


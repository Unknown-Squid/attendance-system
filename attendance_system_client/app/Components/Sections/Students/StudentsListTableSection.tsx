"use client";

import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import AttendanceTable, { AttendanceRecord } from "@/app/Components/Tables/AttendanceTable";

export interface StudentsListTableSectionRef {
  getStudents: () => AttendanceRecord[];
  setFilteredStudents: (students: AttendanceRecord[]) => void;
}

interface StudentsListTableSectionProps {
  students?: AttendanceRecord[];
  loading?: boolean;
  error?: Error | null;
  onRemove?: (id: string) => void;
}

const StudentsListTableSection = forwardRef<StudentsListTableSectionRef, StudentsListTableSectionProps>(
  ({ students = [], loading = false, error = null, onRemove }, ref) => {
    const [filteredStudents, setFilteredStudents] = useState<AttendanceRecord[]>(students);

    // Update filtered students when students prop changes
    useEffect(() => {
      setFilteredStudents(students);
    }, [students]);

    useImperativeHandle(ref, () => ({
      getStudents: () => students,
      setFilteredStudents: (students: AttendanceRecord[]) => setFilteredStudents(students),
    }));

    const handleRemove = (id: string) => {
      setFilteredStudents((prev) => prev.filter((s) => s.id !== id));
      if (onRemove) {
        onRemove(id);
      }
    };

    if (loading) {
      return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Student List</h2>
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">Loading students...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Student List</h2>
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error.message || "Failed to load students"}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Student List</h2>
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">No students found</p>
          </div>
        ) : (
          <AttendanceTable
            records={filteredStudents}
            onRemove={handleRemove}
            showQr={false}
            showSignature={false}
            showStatus={false}
            showDate={false}
            showTime={false}
          />
        )}
      </div>
    );
  }
);

StudentsListTableSection.displayName = "StudentsListTableSection";

export default StudentsListTableSection;


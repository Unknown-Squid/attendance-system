"use client";

import React from "react";
import Button from "@/app/Components/Fields/Buttons";
import Select from "@/app/Components/Fields/Select";

interface SelectOption {
  value: string;
  label: string;
}

const courses: SelectOption[] = [
  { value: "", label: "All Courses" },
  { value: "bsit", label: "BS Information Technology" },
  { value: "bscs", label: "BS Computer Science" },
  { value: "bsce", label: "BS Computer Engineering" },
  { value: "bsee", label: "BS Electrical Engineering" },
];

const majors: SelectOption[] = [
  { value: "", label: "All Majors" },
  { value: "software", label: "Software Engineering" },
  { value: "networking", label: "Networking" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "data-science", label: "Data Science" },
];

const yearLevels: SelectOption[] = [
  { value: "", label: "All Year Levels" },
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const sections: SelectOption[] = [
  { value: "", label: "All Sections" },
  { value: "a", label: "Section A" },
  { value: "b", label: "Section B" },
  { value: "c", label: "Section C" },
  { value: "d", label: "Section D" },
];

interface StudentsListFilterSectionProps {
  yearLevel: string;
  section: string;
  course: string;
  major: string;
  setYearLevel: (value: string) => void;
  setSection: (value: string) => void;
  setCourse: (value: string) => void;
  setMajor: (value: string) => void;
  onGenerateList: () => void;
}

const StudentsListFilterSection = ({
  yearLevel,
  section,
  course,
  major,
  setYearLevel,
  setSection,
  setCourse,
  setMajor,
  onGenerateList,
}: StudentsListFilterSectionProps) => {
  return (
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
            onClick={onGenerateList}
            className="flex items-center gap-2"
          >
            Generate List
          </Button>
        </div>
      </div>
    </div>
  );};

export default StudentsListFilterSection;
"use client";

import React from "react";
import Button from "@/app/Components/Fields/Buttons";
import Select from "@/app/Components/Fields/Select";
import Input from "@/app/Components/Fields/Input";

interface SelectOption {
  value: string;
  label: string;
}

const classifications: SelectOption[] = [
  { value: "", label: "All Classifications" },
  { value: "academic", label: "Academic" },
  { value: "non-academic", label: "Non-Academic" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
];

const subjects: SelectOption[] = [
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

interface FilterRecordsSectionProps {
  classification: string;
  subject: string;
  date: string;
  searchQuery: string;
  activeTab: string;
  setClassification: (value: string) => void;
  setSubject: (value: string) => void;
  setDate: (value: string) => void;
  setSearchQuery: (value: string) => void;
  onGenerateList: () => void;
}

const FilterRecordsSection = ({
  classification,
  subject,
  date,
  searchQuery,
  activeTab,
  setClassification,
  setSubject,
  setDate,
  setSearchQuery,
  onGenerateList,
}: FilterRecordsSectionProps) => {
  return (
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
            onClick={onGenerateList}
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
  );};

export default FilterRecordsSection;
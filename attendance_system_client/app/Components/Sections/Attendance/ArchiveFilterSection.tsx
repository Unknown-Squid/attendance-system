"use client";

import React from "react";
import Button from "@/app/Components/Fields/Buttons";

interface ArchiveFilterSectionProps {
  onExport?: () => void;
  onFilter?: () => void;
}

const ArchiveFilterSection = ({ 
  onExport, 
  onFilter 
}: ArchiveFilterSectionProps) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onExport}>
          Export
        </Button>
        <Button variant="outline" onClick={onFilter}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default ArchiveFilterSection;


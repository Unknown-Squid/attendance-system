// Page structure definitions for React Flow visualization
// This file imports and combines all page structures from separate files

import { ComponentInfo } from "./types";
import { loginPageStructure } from "./loginPageStructure";
import { dashboardPageStructure } from "./dashboardPageStructure";
import { attendancePageStructure } from "./attendancePageStructure";
import { recordsPageStructure } from "./recordsPageStructure";
import { usersPageStructure } from "./usersPageStructure";

export type { ComponentInfo };

export const pageStructures: Record<string, ComponentInfo> = {
  login: loginPageStructure,
  dashboard: dashboardPageStructure,
  attendance: attendancePageStructure,
  records: recordsPageStructure,
  users: usersPageStructure,
};

// Available pages for dropdown selection
export const availablePages = Object.keys(pageStructures).map((key) => ({
  value: key,
  label: `${key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " ")} Page`,
}));

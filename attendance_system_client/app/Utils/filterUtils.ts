import { AttendanceRecord } from "@/app/Components/Tables/AttendanceTable";

/**
 * Filters records by surname
 * @param records - Array of attendance records
 * @param searchQuery - Search query string (can be full name or surname)
 * @returns Filtered array of records matching the surname
 */
export function filterBySurname(
  records: AttendanceRecord[],
  searchQuery: string
): AttendanceRecord[] {
  if (!searchQuery.trim()) {
    return records;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return records.filter((record) => {
    // Split the name into parts
    const nameParts = record.name.toLowerCase().split(" ");
    
    // Get the last part as surname
    const surname = nameParts[nameParts.length - 1];
    
    // Check if surname matches or if any part of the name matches
    return (
      surname.includes(query) ||
      record.name.toLowerCase().includes(query) ||
      record.studentNumber.toLowerCase().includes(query)
    );
  });
}

/**
 * Filters records by multiple criteria
 * @param records - Array of attendance records
 * @param filters - Filter criteria object
 * @returns Filtered array of records
 */
export interface FilterCriteria {
  classification?: string;
  subject?: string;
  date?: string;
  searchQuery?: string;
  course?: string;
  major?: string;
  yearLevel?: string;
  section?: string;
}

export function filterRecords(
  records: AttendanceRecord[],
  filters: FilterCriteria
): AttendanceRecord[] {
  let filtered = [...records];

  // Filter by classification
  if (filters.classification) {
    // Note: Add classification property to AttendanceRecord when available
    // filtered = filtered.filter((record) => record.classification === filters.classification);
  }

  // Filter by subject
  if (filters.subject) {
    // Note: Add subject property to AttendanceRecord when available
    // filtered = filtered.filter((record) => record.subject === filters.subject);
  }

  // Filter by date
  if (filters.date) {
    filtered = filtered.filter((record) => record.date === filters.date);
  }

  // Filter by search query (surname, name, or student number)
  if (filters.searchQuery) {
    filtered = filterBySurname(filtered, filters.searchQuery);
  }

  // Filter by course
  if (filters.course) {
    // Note: Add course property to AttendanceRecord when available
    // filtered = filtered.filter((record) => record.course === filters.course);
  }

  // Filter by major
  if (filters.major) {
    // Note: Add major property to AttendanceRecord when available
    // filtered = filtered.filter((record) => record.major === filters.major);
  }

  // Filter by year level
  if (filters.yearLevel) {
    // Note: Add yearLevel property to AttendanceRecord when available
    // filtered = filtered.filter((record) => record.yearLevel === filters.yearLevel);
  }

  // Filter by section
  if (filters.section) {
    // Note: Add section property to AttendanceRecord when available
    // filtered = filtered.filter((record) => record.section === filters.section);
  }

  return filtered;
}


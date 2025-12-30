/**
 * Validates that start time is before end time
 * @param startTime - Start time in HH:MM format (e.g., "09:00")
 * @param endTime - End time in HH:MM format (e.g., "10:30")
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateTimeRange(
  startTime: string,
  endTime: string
): { isValid: boolean; error?: string } {
  // If either time is empty, validation passes (handled by required validation)
  if (!startTime || !endTime) {
    return { isValid: true };
  }

  // Convert time strings to minutes for comparison
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes >= endMinutes) {
    return {
      isValid: false,
      error: "End time must be after start time",
    };
  }

  return { isValid: true };
}

/**
 * Converts time string (HH:MM) to total minutes
 * @param time - Time string in HH:MM format
 * @returns Total minutes from midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Validates a single time value
 * @param time - Time string in HH:MM format
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateTime(time: string): { isValid: boolean; error?: string } {
  if (!time) {
    return { isValid: true }; // Empty time is handled by required validation
  }

  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return {
      isValid: false,
      error: "Invalid time format. Please use HH:MM format (24-hour)",
    };
  }

  return { isValid: true };
}


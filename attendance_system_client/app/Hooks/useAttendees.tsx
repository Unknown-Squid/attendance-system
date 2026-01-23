import { useState, useEffect } from 'react';
import { getAttendees, Attendee } from '@/app/ApiClient/attendees/attendees';
import { AttendanceRecord } from '@/app/Components/Tables/AttendanceTable';
import { ApiError } from '@/app/Utils/errorHandler';

interface UseAttendeesFilters {
  type?: 'student' | 'teacher';
  course?: string;
  status?: string;
  search?: string;
  yearLevel?: number;
  section?: string;
}

interface UseAttendeesReturn {
  attendees: AttendanceRecord[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export const useAttendees = (filters?: UseAttendeesFilters): UseAttendeesReturn => {
  const [attendees, setAttendees] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAttendees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build API filters (only include supported filters)
      const apiFilters: {
        type?: 'student' | 'teacher';
        course?: string;
        status?: string;
        search?: string;
      } = {
        ...(filters?.type && { type: filters.type }),
        ...(filters?.course && { course: filters.course }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.search && { search: filters.search }),
      };

      const response = await getAttendees(apiFilters);
      
      if (response.success && response.attendees) {
        // Apply client-side filters for yearLevel and section (not supported by API)
        let filteredAttendees = response.attendees;

        if (filters?.yearLevel) {
          filteredAttendees = filteredAttendees.filter(attendee => 
            attendee.yearLevel === Number(filters.yearLevel)
          );
        }

        if (filters?.section) {
          filteredAttendees = filteredAttendees.filter(attendee => 
            attendee.section?.toLowerCase() === filters.section?.toLowerCase()
          );
        }

        // Convert attendees to AttendanceRecord format
        const attendeesList: AttendanceRecord[] = filteredAttendees.map(attendee => ({
          id: attendee.uuid,
          name: attendee.name,
          sex: attendee.sex || 'other',
          studentNumber: attendee.studentNumber || '',
          date: '',
          time: '',
          qr: '',
          signature: '',
          status: 'present' as const,
        }));
        
        setAttendees(attendeesList);
      } else {
        setAttendees([]);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError('An unexpected error occurred', 500, err));
      }
      setAttendees([]);
      console.error('Error fetching attendees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.type, filters?.course, filters?.status, filters?.search, filters?.yearLevel, filters?.section]);

  return {
    attendees,
    loading,
    error,
    refetch: fetchAttendees,
  };
};

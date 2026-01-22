import { useState, useEffect } from 'react';
import { getAttendeesByRoom } from '@/app/ApiClient/attendees/attendees';
import { AttendanceRecord as TableAttendanceRecord } from '@/app/Components/Tables/AttendanceTable';
import { ApiError } from '@/app/Utils/errorHandler';

interface UseEnrolledAttendeesReturn {
  attendees: TableAttendanceRecord[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export const useEnrolledAttendees = (roomId: string | null): UseEnrolledAttendeesReturn => {
  const [attendees, setAttendees] = useState<TableAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAttendees = async () => {
    if (!roomId) {
      setAttendees([]);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await getAttendeesByRoom(roomId);
      
      if (response.success && response.attendees) {
        // Map attendees to table format
        // If attendee has student data, use it; otherwise use attendee data
        const attendeesList: TableAttendanceRecord[] = response.attendees.map(attendee => {
          // If attendee has student reference, use student data
          const student = attendee.student;
          return {
            id: attendee.uuid,
            name: student ? `${student.firstName}${student.middleName ? ` ${student.middleName}` : ''} ${student.surname}`.trim() : attendee.name,
            sex: student ? student.sex : (attendee.sex || 'other'),
            studentNumber: student ? student.studentNumber : (attendee.studentNumber || ''),
            date: '',
            time: '',
            qr: '',
            signature: '',
            status: 'present',
          };
        });
        
        setAttendees(attendeesList);
      } else {
        setAttendees([]);
      }
    } catch (err: any) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError('An unexpected error occurred', 500, err));
      }
      setAttendees([]);
      console.error('Error loading enrolled attendees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [roomId]);

  return {
    attendees,
    loading,
    error,
    refetch: fetchAttendees,
  };
};

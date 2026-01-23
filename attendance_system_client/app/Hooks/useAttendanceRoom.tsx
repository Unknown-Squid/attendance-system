import { useState, useEffect } from 'react';
import { getAttendanceRoomByEnrollmentKey } from '@/app/ApiClient/attendance/attendanceRooms';
import { AttendanceRecord } from '@/app/(Pages)/(restricted)/attendance/page';

interface UseAttendanceRoomReturn {
  room: AttendanceRecord | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAttendanceRoom = (enrollmentKey: string | null): UseAttendanceRoomReturn => {
  const [room, setRoom] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async () => {
    if (!enrollmentKey) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const decodedKey = decodeURIComponent(enrollmentKey);
      const response = await getAttendanceRoomByEnrollmentKey(decodedKey);
      
      if (response.success && response.room) {
        const record: AttendanceRecord = {
          uuid: response.room.uuid,
          enrollmentKey: response.room.enrollmentKey,
          type: response.room.type,
          data: response.room.data,
          category: response.room.category,
          createdAt: response.room.createdAt ? new Date(response.room.createdAt) : new Date(),
        };
        setRoom(record);
      } else {
        setError('Room not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load attendance room');
      console.error('Error loading attendance room:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [enrollmentKey]);

  return {
    room,
    loading,
    error,
    refetch: fetchRoom,
  };
};

import { useState, useEffect } from 'react';
import { getAttendanceRecordsByRoom } from '@/app/ApiClient/attendanceRecords/attendanceRecords';
import { AttendanceRecord as TableAttendanceRecord } from '@/app/Components/Tables/AttendanceTable';

interface UseAttendanceRecordsReturn {
  records: TableAttendanceRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAttendanceRecords = (
  roomId: string | null,
  date?: string
): UseAttendanceRecordsReturn => {
  const [records, setRecords] = useState<TableAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    if (!roomId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const today = date || new Date().toISOString().split('T')[0];
      const response = await getAttendanceRecordsByRoom(roomId, { date: today });
      
      if (response.success && response.records) {
        const recordsList: TableAttendanceRecord[] = response.records.map(record => ({
          id: record.uuid,
          name: record.attendee?.name || 'Unknown',
          sex: record.attendee?.sex || 'other',
          studentNumber: record.attendee?.studentNumber || '',
          date: record.date || '',
          time: record.time || '',
          qr: record.qrCode || '',
          signature: record.signature || '',
          status: record.status || 'present',
        }));
        
        setRecords(recordsList);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load attendance records');
      console.error('Error loading attendance records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [roomId, date]);

  return {
    records,
    loading,
    error,
    refetch: fetchRecords,
  };
};

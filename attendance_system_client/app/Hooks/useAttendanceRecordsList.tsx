import { useState, useEffect } from 'react';
import { getAttendanceRecords, AttendanceRecord as ApiAttendanceRecord } from '@/app/ApiClient/attendanceRecords/attendanceRecords';
import { AttendanceRecord as TableAttendanceRecord } from '@/app/Components/Tables/AttendanceTable';
import { ApiError } from '@/app/Utils/errorHandler';

interface UseAttendanceRecordsListFilters {
  roomId?: string;
  attendeeId?: string;
  date?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface UseAttendanceRecordsListReturn {
  records: TableAttendanceRecord[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export const useAttendanceRecordsList = (
  filters?: UseAttendanceRecordsListFilters
): UseAttendanceRecordsListReturn => {
  const [records, setRecords] = useState<TableAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAttendanceRecords(filters);
      
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
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError('An unexpected error occurred', 500, err));
      }
      console.error('Error fetching attendance records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.roomId, filters?.attendeeId, filters?.date, filters?.status, filters?.dateFrom, filters?.dateTo]);

  return {
    records,
    loading,
    error,
    refetch: fetchRecords,
  };
};

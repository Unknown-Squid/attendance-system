import apiClient from '../apiClient';
import { handleApiRequest } from '@/app/Utils/errorHandler';

export interface DashboardStats {
  totalStudents: number;
  totalStudentsByGender: {
    male: number;
    female: number;
    other: number;
  };
  totalRooms: number;
  totalRoomsByType: {
    regular: number;
    event: number;
  };
  totalAttendance: {
    present: number;
    absent: number;
    late: number;
    excused: number;
  };
  todayAttendance: {
    totalStudents: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    notRecorded: number;
  };
  monthlyAttendance: Array<{
    month: string;
    present: number;
    absent: number;
  }>;
  genderComparison: Array<{
    category: string;
    male: number;
    female: number;
    other: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user?: string;
  }>;
}

export interface DashboardStatsResponse {
  success: boolean;
  stats: DashboardStats;
}

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
  return handleApiRequest<DashboardStatsResponse>(
    () => apiClient.request<DashboardStatsResponse['stats']>('/dashboard/stats', { method: 'GET' }),
    'Failed to fetch dashboard statistics'
  );
};

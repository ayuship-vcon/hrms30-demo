import { useCallback } from 'react';
import { useGetAttendanceRecordsQuery, useCreateAttendanceMutation, useDeleteAttendanceMutation } from '@/core/api/attendance';
import type { CreateAttendanceRequest } from '@/core/api/attendance';

export function useAttendance() {
  const recordsQuery = useGetAttendanceRecordsQuery();
  const [createAttendanceMutation] = useCreateAttendanceMutation();
  const [deleteAttendanceMutation] = useDeleteAttendanceMutation();
  const records = recordsQuery.data ?? [];
  const isLoading = recordsQuery.isLoading;

  const checkIn = useCallback(
    (location: string = 'Headquarters Office') => {
      const data: CreateAttendanceRequest = {
        employeeId: 'emp-1',
        employeeName: 'Harsh Vardhan',
        date: new Date().toISOString().split('T')[0],
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        workingHours: 8.0,
        status: 'present',
        location,
      };
      return createAttendanceMutation(data).unwrap();
    },
    [createAttendanceMutation]
  );

  const addManualRecord = useCallback(
    (data: CreateAttendanceRequest) => {
      return createAttendanceMutation(data).unwrap();
    },
    [createAttendanceMutation]
  );

  const deleteAttendance = useCallback(
    (id: string) => {
      return deleteAttendanceMutation(id).unwrap();
    },
    [deleteAttendanceMutation]
  );

  return {
    records,
    isLoading,
    checkIn,
    punchIn: checkIn,
    addManualRecord,
    deleteAttendance,
  };
}

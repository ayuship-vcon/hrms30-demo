import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Button, Modal, Toast, DeleteConfirmDialog, PageLoader } from '@/shared/components';
import { AttendanceTable } from '../components/AttendanceTable';
import { AttendanceForm } from '../components/AttendanceForm';
import { useAttendance } from '../core/hooks/useAttendance';
import type { AttendanceRecord } from '../core/types';
import type { CreateAttendanceRequest } from '@/core/api/attendance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AttendancePage: React.FC = () => {
  const { records, isLoading, punchIn, addManualRecord, deleteAttendance } = useAttendance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingAttendance, setDeletingAttendance] = useState<AttendanceRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasPunchedInToday, setHasPunchedInToday] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePunchToggle = useCallback(async () => {
    await punchIn();
    setHasPunchedInToday(true);
    setToastMessage('Punch-In successfully logged in Redux Store!');
  }, [punchIn]);

  const handleManualCreate = useCallback(
    async (data: CreateAttendanceRequest) => {
      await addManualRecord(data);
      setIsModalOpen(false);
      setToastMessage('Manual attendance record added to Redux Store!');
    },
    [addManualRecord]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingAttendance) return;
    await deleteAttendance(deletingAttendance.id);
    setToastMessage(`Attendance record for ${deletingAttendance.date} deleted.`);
    setDeletingAttendance(null);
  }, [deletingAttendance, deleteAttendance]);

  const presentCount = useMemo(
    () => records.filter((r) => r.status === 'present').length,
    [records]
  );
  const lateCount = useMemo(
    () => records.filter((r) => r.status === 'late').length,
    [records]
  );

  if (isLoading && records.length === 0) {
    return (
      <PageLoader
        message="Loading attendance records..."
        description="Fetching live biometric logs and shift schedules"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Attendance &amp; Time Tracking</h1>
          <p className="text-sm text-muted mt-1">
            Real-time biometric punch logs, shift compliance, and remote clock-in controls
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<AddCircleOutlineIcon />}
            onClick={() => setIsModalOpen(true)}
            size="md"
          >
            Manual Entry
          </Button>
          <Button
            variant={hasPunchedInToday ? 'outline' : 'primary'}
            leftIcon={<FingerprintIcon />}
            onClick={handlePunchToggle}
            size="md"
          >
            {hasPunchedInToday ? 'Clocked In' : 'Punch In Now'}
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Live System Clock</span>
            <div className="w-8 h-8 rounded-sm bg-primary-light text-primary flex items-center justify-center">
              <AccessTimeIcon sx={{ fontSize: 20 }} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-primary font-mono tracking-tight">{currentTime}</div>
            <p className="text-sm text-muted mt-0.5">Corporate Standard Time (UTC+05:30)</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-success">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span>Biometric terminal online</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Present Today</span>
            <div className="w-8 h-8 rounded-sm bg-success-bg text-success flex items-center justify-center">
              <HowToRegIcon sx={{ fontSize: 20 }} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-black tracking-tight">{presentCount} Staff</div>
            <p className="text-sm text-muted mt-0.5">Verified on-premises &amp; remote punch-ins</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <span>{records.length} total scheduled shifts</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Late Arrivals</span>
            <div className="w-8 h-8 rounded-sm bg-primary-light text-primary flex items-center justify-center">
              <AccessTimeIcon sx={{ fontSize: 20 }} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-black tracking-tight">{lateCount} Late</div>
            <p className="text-sm text-muted mt-0.5">Punches recorded past 09:30 AM grace window</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted">
            <span>98.2% Punctuality rating</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <Card title="Attendance Registry" subtitle={`Showing ${records.length} recorded shift entries`}>
        <AttendanceTable
          records={records}
          isLoading={isLoading}
          onDelete={(r) => setDeletingAttendance(r)}
        />
      </Card>

      {/* Manual Entry Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Manual Attendance Punch"
        maxWidth="sm"
      >
        <AttendanceForm onSubmit={handleManualCreate} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingAttendance)}
        onClose={() => setDeletingAttendance(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Attendance Record"
        itemName={deletingAttendance ? `${deletingAttendance.employeeName} (${deletingAttendance.date})` : ''}
        message="Are you sure you want to delete this punch record? This will adjust the employee's calculated timesheet."
      />

      {/* Toast Notifications */}
      {toastMessage && (
        <Toast
          isOpen={Boolean(toastMessage)}
          message={toastMessage}
          severity="success"
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

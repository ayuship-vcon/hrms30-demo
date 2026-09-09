import React, { useState, useMemo, useCallback } from 'react';
import { Card, Button, Modal, Toast, DeleteConfirmDialog, PageLoader } from '@/shared/components';
import { HolidayTable } from '../components/HolidayTable';
import { HolidayForm } from '../components/HolidayForm';
import { useHoliday } from '../core/hooks/useHoliday';
import type { Holiday } from '../core/types';
import type { CreateHolidayRequest } from '@/core/api/holiday';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export const HolidayPage: React.FC = () => {
  const { holidays, isLoading, createHoliday, deleteHoliday } = useHoliday();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingHoliday, setDeletingHoliday] = useState<Holiday | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nationalHolidays = useMemo(
    () => holidays.filter((h) => h.type === 'national').length,
    [holidays]
  );
  const regionalHolidays = useMemo(
    () => holidays.filter((h) => h.type === 'regional').length,
    [holidays]
  );
  const optionalHolidays = useMemo(
    () => holidays.filter((h) => h.type === 'optional').length,
    [holidays]
  );

  const handleCreate = useCallback(
    async (data: CreateHolidayRequest) => {
      await createHoliday(data);
      setIsModalOpen(false);
      setToastMessage('New holiday added to corporate calendar!');
    },
    [createHoliday]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingHoliday) return;
    await deleteHoliday(deletingHoliday.id);
    setToastMessage(`Holiday ${deletingHoliday.name} removed from calendar.`);
    setDeletingHoliday(null);
  }, [deletingHoliday, deleteHoliday]);

  if (isLoading && holidays.length === 0) {
    return (
      <PageLoader
        message="Loading holiday calendar..."
        description="Fetching corporate observances and scheduled public holidays"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Corporate Holiday Calendar</h1>
          <p className="text-sm text-muted mt-1">
            Annual scheduled observances, regional festivals, and mandatory corporate paid days off
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<AddCircleOutlineIcon />}
          onClick={() => setIsModalOpen(true)}
          size="md"
        >
          Add Holiday
        </Button>
      </div>

      {/* KPI Metric Cards (8px small radius) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center">
            <CelebrationIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">National Observances</p>
            <p className="text-2xl font-bold text-black mt-0.5">{nationalHolidays} Days</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center">
            <BeachAccessIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Regional Holidays</p>
            <p className="text-2xl font-bold text-black mt-0.5">{regionalHolidays} Days</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center">
            <EventAvailableIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Optional Floating Days</p>
            <p className="text-2xl font-bold text-black mt-0.5">{optionalHolidays} Days</p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <Card title="Calendar Schedule" subtitle={`Showing ${holidays.length} configured holiday events`}>
        <HolidayTable
          holidays={holidays}
          isLoading={isLoading}
          onDelete={(h) => setDeletingHoliday(h)}
        />
      </Card>

      {/* Add Holiday Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Calendar Holiday"
        maxWidth="sm"
      >
        <HolidayForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingHoliday)}
        onClose={() => setDeletingHoliday(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Holiday from Calendar"
        itemName={deletingHoliday ? deletingHoliday.name : ''}
        message="Are you sure you want to remove this holiday from the schedule? Employees will no longer see this day as an official observance."
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

import React, { useState, useMemo, useCallback } from 'react';
import { Button, Modal, Toast, Card, DeleteConfirmDialog, PageLoader } from '@/shared/components';
import { EmployeeFilters } from '../components/EmployeeFilters';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeForm } from '../components/EmployeeForm';
import { useEmployeeList } from '../core/hooks/useEmployeeList';
import type { Employee } from '../core/types';
import type { CreateEmployeeRequest } from '@/core/api/employee';
import type { EmployeeFormData } from '../validations/employee.validation';
import type { Status } from '@/shared/types/common.types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

export const EmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    employees,
    filteredEmployees,
    isLoading,
    filters,
    updateFilters,
    clearFilters,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployeeList();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Memoized Statistics calculation
  const totalEmployees = useMemo(() => employees.length, [employees]);
  const activeEmployees = useMemo(
    () => employees.filter((e) => e.status === 'active').length,
    [employees]
  );
  const totalPayroll = useMemo(
    () => employees.reduce((acc, curr) => acc + (curr.salary || 0), 0),
    [employees]
  );
  const uniqueDepartments = useMemo(
    () => Array.from(new Set(employees.map((e) => e.department))).length,
    [employees]
  );

  const handleOpenAdd = useCallback(() => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);

  }, []);

  const handleOpenEdit = useCallback((employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  }, []);

  const handleSubmit = useCallback(
    async (formData: EmployeeFormData) => {
      const payload: CreateEmployeeRequest = {
        ...formData,
        role: formData.role as string,
        status: (formData.status as Status) || 'active',
      };
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, payload);
        setToastMessage('Employee profile updated in Redux Store!');
      } else {
        await addEmployee(payload);
        setToastMessage('New employee added to Redux Store!');
      }
      setIsFormModalOpen(false);
      setEditingEmployee(null);
    },
    [editingEmployee, updateEmployee, addEmployee]
  );

  const handleDeleteRequest = useCallback(
    (id: string) => {
      const target = employees.find((e) => e.id === id);
      if (target) {
        setDeletingEmployee(target);
      }
    },
    [employees]
  );

  const handleCloseDelete = useCallback(() => {
    setDeletingEmployee(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingEmployee) return;
    await deleteEmployee(deletingEmployee.id);
    setToastMessage(`Employee ${deletingEmployee.firstName} ${deletingEmployee.lastName} removed from store.`);
    setDeletingEmployee(null);
  }, [deletingEmployee, deleteEmployee]);

  const handleViewEmployee = useCallback(
    (emp: Employee) => {
      navigate(ROUTES.EMPLOYEES.DETAILS(emp.id));
    },
    [navigate]
  );

  const handleCloseToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  if (isLoading && employees.length === 0) {
    return (
      <PageLoader
        message="Loading workforce directory..."
        description="Fetching employee profiles and department assignments"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-sm border border-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Workforce Management</h1>
          </div>
          <p className="text-sm text-muted mt-1">
            Directory, role assignments, compensation, and profile records
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<AddCircleOutlineIcon />}
          onClick={handleOpenAdd}
          size="md"
        >
          Add Employeess
        </Button>
      </div>

      {/* KPI Stat Cards (8px small radius) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center shrink-0">
            <GroupsOutlinedIcon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Total Headcount</p>
            <p className="text-2xl font-bold text-black mt-0.5">{totalEmployees}</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-success-bg text-success flex items-center justify-center shrink-0">
            <CheckCircleOutlineIcon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Active Staff</p>
            <p className="text-2xl font-bold text-black mt-0.5">{activeEmployees}</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center shrink-0">
            <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Annual Payroll</p>
            <p className="text-2xl font-bold text-black mt-0.5">
              ${(totalPayroll / 1000).toFixed(0)}k <span className="text-sm font-normal text-muted">/yr</span>
            </p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-sm border border-border shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm bg-primary-light text-primary flex items-center justify-center shrink-0">
            <BusinessOutlinedIcon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Departments</p>
            <p className="text-2xl font-bold text-black mt-0.5">{uniqueDepartments} Units</p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <EmployeeFilters
        filters={filters}
        onChange={updateFilters}
        onReset={clearFilters}
      />

      {/* Main Data Table Card */}
      <Card title="Employee Directory" subtitle={`Showing ${filteredEmployees.length} matching team members`}>
        <EmployeeTable
          employees={filteredEmployees}
          isLoading={isLoading}
          onView={handleViewEmployee}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteRequest}
        />
      </Card>

      {/* Employee Modal Form */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        title={editingEmployee ? 'Edit Employee Details' : 'Add New Employee'}
        maxWidth="md"
      >
        <EmployeeForm
          initialValues={editingEmployee || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={Boolean(deletingEmployee)}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Employee Profile"
        itemName={deletingEmployee ? `${deletingEmployee.firstName} ${deletingEmployee.lastName}` : ''}
        message="Are you sure you want to permanently delete this employee? This will remove all their system records and historical access."
      />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          isOpen={Boolean(toastMessage)}
          message={toastMessage}
          severity="success"
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

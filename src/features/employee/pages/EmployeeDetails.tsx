import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Loader, Card } from '@/shared/components';
import { useEmployeeDetails } from '../core/hooks/useEmployeeDetails';
import { EmployeeCard } from '../components/EmployeeCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '@/shared/constants/routes.constants';

export const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { employee, isLoading } = useEmployeeDetails(id);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader text="Loading employee profile..." />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border">
        <p className="text-gray-600 mb-4">Employee record not found.</p>
        <Button variant="secondary" onClick={() => navigate(ROUTES.EMPLOYEES.LIST)}>
          Back to Employee Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(ROUTES.EMPLOYEES.LIST)}
          leftIcon={<ArrowBackIcon fontSize="small" />}
        >
          Back
        </Button>
        <h1 className="text-xl font-bold text-gray-900">Employee Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <EmployeeCard employee={employee} />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card title="Employment Details">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Department</span>
                <span className="font-semibold text-gray-800">{employee.department}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Designation</span>
                <span className="font-semibold text-gray-800">{employee.designation}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Access Role</span>
                <span className="font-semibold text-indigo-600">{employee.role}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Status</span>
                <span className="font-semibold text-green-600 uppercase text-sm">{employee.status}</span>
              </div>
            </div>
          </Card>

          <Card title="Activity & Performance Overview">
            <p className="text-sm text-gray-500">
              Employee attendance rate is currently at 98.5% with 0 pending disciplinary actions.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Card } from '@/shared/components';
import type { Employee } from '../core/types';
import { formatCurrency } from '@/shared/utils/currency.utils';
import { formatDate } from '@/shared/utils/date.utils';
import { getInitials } from '@/shared/utils/formatter.utils';

export interface EmployeeCardProps {
  employee: Employee;
  onEdit?: (emp: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
          {getInitials(`${employee.firstName} ${employee.lastName}`)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h4>
            <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {employee.employeeCode}
            </span>
          </div>
          <p className="text-sm text-indigo-600 font-medium">{employee.designation}</p>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 text-sm">
        <div>
          <span className="text-gray-400 block">Email</span>
          <span className="font-medium text-gray-700">{employee.email}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Phone</span>
          <span className="font-medium text-gray-700">{employee.phone}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Joined</span>
          <span className="font-medium text-gray-700">{formatDate(employee.joiningDate)}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Compensation</span>
          <span className="font-medium text-gray-900">{formatCurrency(employee.salary)} / yr</span>
        </div>
      </div>
    </Card>
  );
};

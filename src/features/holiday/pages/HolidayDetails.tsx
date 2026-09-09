import React from 'react';
import { Card, Button } from '@/shared/components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';

export const HolidayDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Holiday Details</h1>
        <Button variant="secondary" onClick={() => navigate(ROUTES.HOLIDAY.ROOT)}>
          Back to Holidays
        </Button>
      </div>

      <Card title="Corporate Observance Policy">
        <p className="text-sm text-gray-600">
          Employees on duty during national holidays will be granted compensatory off as per policy.
        </p>
      </Card>
    </div>
  );
};

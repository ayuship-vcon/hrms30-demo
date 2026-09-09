import React from 'react';
import { Card, Button } from '@/shared/components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';

export const AttendanceDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Log Details</h1>
        <Button variant="secondary" onClick={() => navigate(ROUTES.ATTENDANCE.ROOT)}>
          Back to Attendance
        </Button>
      </div>

      <Card title="Punch In / Out Audit Details">
        <p className="text-sm text-gray-600">
          IP Address and Geolocation timestamps recorded according to compliance guidelines.
        </p>
      </Card>
    </div>
  );
};

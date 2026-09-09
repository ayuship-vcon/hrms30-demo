import React from 'react';
import { Card, Button } from '@/shared/components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';

export const AdminDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Audit Details</h1>
        <Button variant="secondary" onClick={() => navigate(ROUTES.ADMIN.ROOT)}>
          Back to Admin
        </Button>
      </div>

      <Card title="Security Profile Compliance">
        <p className="text-sm text-gray-600">
          SOC-2 Type II audit compliance active across all organizational units.
        </p>
      </Card>
    </div>
  );
};

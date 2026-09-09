import React from 'react';
import { Card } from '@/shared/components';

export interface HrCardProps {
  hrAdminName?: string;
  notes?: string;
}

export const HrCard: React.FC<HrCardProps> = ({
  hrAdminName = 'HR Central Helpdesk',
  notes = 'All compliance verifications completed.',
}) => {
  return (
    <Card title="HR Central Verification">
      <p className="text-sm text-gray-500 mb-1">Handled By: <span className="font-semibold text-gray-700">{hrAdminName}</span></p>
      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{notes}</p>
    </Card>
  );
};

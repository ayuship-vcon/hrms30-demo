import React from 'react';
import { Card } from '@/shared/components';

export interface ApproverCardProps {
  approverName?: string;
  approverRole?: string;
  status?: string;
  comment?: string;
}

export const ApproverCard: React.FC<ApproverCardProps> = ({
  approverName = 'Sarah Jenkins',
  approverRole = 'Engineering Manager',
  status = 'Approved',
  comment,
}) => {
  return (
    <Card title="Approver Review">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{approverName}</p>
          <p className="text-sm text-gray-500">{approverRole}</p>
        </div>
        <span className="badge badge-success">{status}</span>
      </div>
      {comment && <p className="mt-3 text-sm text-gray-600 italic bg-gray-50 p-2 rounded">"{comment}"</p>}
    </Card>
  );
};

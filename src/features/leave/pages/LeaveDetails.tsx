import React from 'react';
import { Card, Button } from '@/shared/components';
import { ApproverCard } from '../components/ApproverCard';
import { HrCard } from '../components/HrCard';
import { LeaveDateRow } from '../components/LeaveDateRow';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';

export const LeaveDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leave Application Details</h1>
        <Button variant="secondary" onClick={() => navigate(ROUTES.LEAVE.ROOT)}>
          Back to Leaves
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Application Summary">
          <div className="flex flex-col gap-4">
            <LeaveDateRow startDate="2026-09-01" endDate="2026-09-05" totalDays={5} />
            <div>
              <span className="text-sm text-gray-400 block">Applicant</span>
              <span className="font-semibold text-gray-800">Harsh Vardhan (EMP-1001)</span>
            </div>
            <div>
              <span className="text-sm text-gray-400 block">Type</span>
              <span className="font-semibold text-indigo-600">Annual Paid Leave</span>
            </div>
            <div>
              <span className="text-sm text-gray-400 block">Reason</span>
              <p className="text-sm text-gray-600">Family annual vacation trip</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <ApproverCard />
          <HrCard />
        </div>
      </div>
    </div>
  );
};

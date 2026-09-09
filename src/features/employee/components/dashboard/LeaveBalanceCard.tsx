import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components';
import { ROUTES } from '@/shared/constants/routes.constants';
import dashboardData from '@/shared/data/dashboard.data.json';

export interface LeaveGaugeItem {
  id?: string;
  label: string;
  used: number;
  total: number;
  percentage: number;
}

export const LeaveBalanceCard: React.FC = () => {
  const navigate = useNavigate();
  const { title, actionText, actionRoute, balances, lastApplication } = dashboardData.leaveBalance;

  // SVG Circle calculations for 70x70 gauge with center (35, 35) and radius 30
  const radius = 30;
  const circumference = 2 * Math.PI * radius; // ~188.5

  return (
    <div className="bg-surface rounded-sm p-4 sm:p-5 shadow-card border border-border flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-borderLight">
          <h2 className="text-sm font-bold text-[#0b4668] tracking-tight">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(actionRoute || ROUTES.LEAVE.ROOT)}
            className="!text-xs !font-semibold !text-slate-700 hover:!text-slate-950 !underline !p-0 !h-auto"
          >
            {actionText}
          </Button>
        </div>

        {/* Circular Gauges Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center mb-6">
          {balances.map((item: LeaveGaugeItem) => {
            const strokeDash = (item.percentage / 100) * circumference;
            return (
              <div key={item.id || item.label} className="flex flex-col items-center gap-1.5">
                {/* 70x70 Circle Gauge */}
                <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center rounded-full bg-surface">
                  <svg className="w-[70px] h-[70px]" viewBox="0 0 70 70">
                    {/* Track Stroke (#f1f1f1) */}
                    <circle
                      cx="35"
                      cy="35"
                      r={radius}
                      stroke="#f1f1f1"
                      strokeWidth="5"
                      fill="none"
                    />

                    {/* Progress Arc (#0b4668 Deep Navy) */}
                    <circle
                      cx="35"
                      cy="35"
                      r={radius}
                      stroke="#0b4668"
                      strokeWidth="5"
                      strokeDasharray={`${strokeDash} ${circumference}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(180 35 35)"
                    />
                  </svg>

                  {/* Centered fraction count */}
                  <span className="absolute font-bold text-[13px] sm:text-[14px] text-[#0b4668] tracking-[0.13px] leading-tight">
                    {item.used}/{item.total}
                  </span>
                </div>

                {/* Label below gauge */}
                <span className="font-medium text-[12px] text-neutralDark leading-tight text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Last Application Sub-card */}
        {lastApplication && (
          <div className="pt-3 border-t border-borderLight">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#0b4668]">Last Application</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(ROUTES.LEAVE.ROOT)}
                className="!text-xs !text-slate-500 hover:!text-slate-800 !underline !p-0 !h-auto"
              >
                View
              </Button>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-sm border border-slate-200">
              <div>
                <p className="text-sm font-semibold text-neutralDark">{lastApplication.title}</p>
                <p className="text-[11px] text-neutralDark-muted font-medium mt-0.5">{lastApplication.appliedDate}</p>
              </div>
              {/* Status Badge */}
              <span className="px-3 py-1 rounded-sm text-xs font-semibold select-none bg-emerald-50 text-emerald-800 border border-emerald-200">
                {lastApplication.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

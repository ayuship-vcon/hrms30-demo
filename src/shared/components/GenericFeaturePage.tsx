import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { Button } from './Button/Button';
import { ROUTES } from '@/shared/constants/routes.constants';

export interface GenericFeaturePageProps {
  title: string;
  description: string;
  badgeText?: string;
  icon?: React.ReactNode;
}

export const GenericFeaturePage: React.FC<GenericFeaturePageProps> = ({
  title,
  description,
  badgeText = 'Module Active',
  icon,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-10">
      {/* Top Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="bg-surface rounded-sm p-8 sm:p-10 border border-border shadow-card flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-neutralLight text-[#0b4668] flex items-center justify-center mb-4 shadow-2xs">
          {icon || <ConstructionOutlinedIcon sx={{ fontSize: 32 }} />}
        </div>

        <span className="px-3 py-1 rounded-[6px] bg-[#e6f9f2] text-[#065f46] text-sm font-semibold select-none mb-3">
          {badgeText}
        </span>

        <h1 className="text-xl sm:text-2xl font-bold text-[#0b4668] tracking-tight mb-2">
          {title}
        </h1>

        <p className="text-sm sm:text-sm text-neutralDark-muted max-w-md mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

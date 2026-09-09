import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components';
import dashboardData from '@/shared/data/dashboard.data.json';

// Icons
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

export interface ServiceItem {
  id: string;
  title: string;
  iconKey: string;
  path: string;
}

export const ExploreServicesCard: React.FC = () => {
  const navigate = useNavigate();
  const { title, viewAllText, services } = dashboardData.exploreServices;

  const getServiceIcon = (key: string) => {
    switch (key) {
      case 'calendar':
        return <CalendarMonthOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'time':
        return <AccessTimeOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'receipt':
        return <ReceiptLongOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'article':
        return <ArticleOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'tree':
        return <AccountTreeOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'plus':
        return <AddCircleOutlineOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'wallet':
        return <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 22 }} />;
      case 'gift':
        return <CardGiftcardOutlinedIcon sx={{ fontSize: 22 }} />;
      default:
        return <ArticleOutlinedIcon sx={{ fontSize: 22 }} />;
    }
  };

  return (
    <div className="bg-surface rounded-sm p-4 sm:p-5 shadow-card border border-border flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-borderLight">
        <h2 className="text-sm font-bold text-[#0b4668] tracking-tight">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/employees')}
          className="!text-xs !text-slate-500 hover:!text-slate-800 !underline !p-0 !h-auto"
        >
          {viewAllText}
        </Button>
      </div>

      {/* Grid: 4 columns x 2 rows */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 sm:gap-y-6 gap-x-4">
        {services.map((svc: ServiceItem) => (
          <div
            key={svc.id}
            onClick={() => svc.path && svc.path !== '#' && navigate(svc.path)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-[10px] bg-[#f1f1f1] group-hover:bg-slate-200 text-[#0b4668] flex items-center justify-center transition-all shadow-2xs group-hover:scale-105">
              {getServiceIcon(svc.iconKey)}
            </div>
            <span className="text-sm font-semibold text-[#0b4668] group-hover:underline mt-2 text-center leading-tight">
              {svc.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { vconstructLogo } from '@/assets/images';

export const Footer: React.FC = () => {
  return (
    <footer className="h-14 bg-surface border-t border-border px-6 gap-2 flex items-center justify-center text-sm text-neutralDark w-full mt-auto sticky bottom-0 z-30">
      <div className="flex items-center justify-center">
        <img
          src={vconstructLogo}
          alt="vConstruct Logo"
          className="h-6 w-auto object-contain select-none pointer-events-none"
        />
      </div>
      <span>Copyright &copy; {new Date().getFullYear()} vConstruct. All Rights Reserved</span>
    </footer>
  );
};

import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

export interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex justify-end my-4 ${className}`}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
        size="small"
      />
    </div>
  );
};

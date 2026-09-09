import { useState, useMemo, useCallback } from 'react';

export interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage((prev) => Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    setPageSize,
  };
}

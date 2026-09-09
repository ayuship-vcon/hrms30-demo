import { useGetEmployeeByIdQuery } from '@/core/api/employee';

export function useEmployeeDetails(id?: string | number) {
  const query = useGetEmployeeByIdQuery(id as string, { skip: !id });

  return {
    employee: query.data ?? null,
    isLoading: query.isLoading,
  };
}

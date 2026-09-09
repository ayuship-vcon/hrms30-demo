import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/core/redux/hooks/useAppDispatch";
import {
  selectEmployeeFilters,
  setEmployeeFilters,
  resetEmployeeFilters,
} from "@/core/redux/employee";
import {
  useGetEmployeesQuery,
  useLazyGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "@/core/api/employee";
import type {
  EmployeeState,
  EmployeeFiltersState,
} from "../types";
import type {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from "@/core/api/employee";
import { filterEmployees } from "../utils/employeeFilter.utils";

export function useEmployee() {
  const dispatch = useAppDispatch();
  const filters = useSelector((state: { employee: EmployeeState }) =>
    selectEmployeeFilters(state),
  );

  const employeesQuery = useGetEmployeesQuery();
  const [getEmployeeById] = useLazyGetEmployeeByIdQuery();
  const [createEmployeeMutation] = useCreateEmployeeMutation();
  const [updateEmployeeMutation] = useUpdateEmployeeMutation();
  const [deleteEmployeeMutation] = useDeleteEmployeeMutation();

  const employees = employeesQuery.data?.items ?? [];
  const filteredEmployees = filterEmployees(employees, filters);
  const selectedEmployee = null;
  const isLoading = employeesQuery.isLoading || employeesQuery.isFetching;

  // 1. Fetch all: Calls API -> Stores in Redux
  const loadEmployees = useCallback(() => {
    return employeesQuery.refetch();
  }, [employeesQuery]);

  // 2. Fetch single: Calls API -> Stores in Redux
  const loadEmployeeById = useCallback(
    (id: string | number) => {
      return getEmployeeById(id).unwrap();
    },
    [getEmployeeById],
  );

  // 3. Add: Calls API -> Stores added record in Redux
  const addEmployee = useCallback(
    (data: CreateEmployeeRequest) => {
      return createEmployeeMutation(data).unwrap();
    },
    [createEmployeeMutation],
  );

  // 4. Update: Calls API -> Stores updated record in Redux
  const updateEmployee = useCallback(
    (id: string | number, data: UpdateEmployeeRequest) => {
      return updateEmployeeMutation({ id, data }).unwrap();
    },
    [updateEmployeeMutation],
  );

  // 5. Delete: Calls API -> Removes record from Redux
  const deleteEmployee = useCallback(
    (id: string | number) => {
      return deleteEmployeeMutation(id).unwrap();
    },
    [deleteEmployeeMutation],
  );

  // Filter actions
  const updateFilters = useCallback(
    (newFilters: Partial<EmployeeFiltersState>) => {
      dispatch(setEmployeeFilters(newFilters));
    },
    [dispatch],
  );

  const clearFilters = useCallback(() => {
    dispatch(resetEmployeeFilters());
  }, [dispatch]);

  return {
    employees,
    filteredEmployees,
    selectedEmployee,
    isLoading,
    filters,
    loadEmployees,
    loadEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    updateFilters,
    clearFilters,
  };
}

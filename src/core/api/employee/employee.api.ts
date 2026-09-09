import type { Employee } from "@/features/employee/core/types/employee.types";
import type {
  CreateEmployeeRequest,
  GetEmployeesParams,
  UpdateEmployeeRequest,
} from "./employeeApi.types";
import type { PaginatedResult } from "@/shared/types/pagination.types";
import { API_ENDPOINTS } from "@/shared/constants";
import { baseApi, extractApiData } from "../client/baseApi";

export const employeeQueries = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      PaginatedResult<Employee>,
      GetEmployeesParams | void
    >({
      query: (params) => ({
        url: API_ENDPOINTS.EMPLOYEE.ROOT,
        params: params || undefined,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<PaginatedResult<Employee>>(response),
      providesTags: ["Employees"],
    }),

    getEmployeeById: builder.query<Employee, string | number>({
      query: (id) => `${API_ENDPOINTS.EMPLOYEE.ROOT}/${id}`,
      transformResponse: (response: unknown) =>
        extractApiData<Employee>(response),
      providesTags: (_result, _error, id) => [{ type: "Employees", id }],
    }),

    createEmployee: builder.mutation<Employee, CreateEmployeeRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.EMPLOYEE.ROOT,
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<Employee>(response),
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation<
      Employee,
      { id: string | number; data: UpdateEmployeeRequest }
    >({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.EMPLOYEE.ROOT}/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: unknown) =>
        extractApiData<Employee>(response),
      invalidatesTags: ["Employees"],
    }),
    
    deleteEmployee: builder.mutation<string, string | number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.EMPLOYEE.ROOT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useLazyGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeQueries;

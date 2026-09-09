import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Employee, EmployeeState, EmployeeFiltersState } from '@/features/employee/core/types/employee.types';

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  filters: {
    search: '',
    department: '',
    status: '',
  },
  isLoading: false,
  error: null,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // 1. Loading State
    setEmployeeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // 2. Set All Employees (Safely normalizes both arrays and paginated { items: [] } objects)
    setEmployees: (
      state,
      action: PayloadAction<Employee[] | { items: Employee[] }>
    ) => {
      if (Array.isArray(action.payload)) {
        state.employees = action.payload;
      } else if (action.payload && Array.isArray(action.payload.items)) {
        state.employees = action.payload.items;
      } else {
        state.employees = [];
      }
      state.isLoading = false;
      state.error = null;
    },

    // 3. Add Single Employee (after POST API call)
    addEmployee: (state, action: PayloadAction<Employee>) => {
      if (!Array.isArray(state.employees)) {
        state.employees = [];
      }
      state.employees.unshift(action.payload);
      state.isLoading = false;
    },

    // 4. Update Single Employee (after PUT API call)
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      if (Array.isArray(state.employees)) {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      }
      if (state.selectedEmployee?.id === action.payload.id) {
        state.selectedEmployee = action.payload;
      }
      state.isLoading = false;
    },

    // 5. Delete Single Employee (after DELETE API call)
    deleteEmployee: (state, action: PayloadAction<string>) => {
      if (Array.isArray(state.employees)) {
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      }
      if (state.selectedEmployee?.id === action.payload) {
        state.selectedEmployee = null;
      }
      state.isLoading = false;
    },

    // Select Employee for Details View
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },

    // Filters
    setEmployeeFilters: (state, action: PayloadAction<Partial<EmployeeFiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetEmployeeFilters: (state) => {
      state.filters = { search: '', department: '', status: '' };
    },

    setEmployeeError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setEmployeeLoading,
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setSelectedEmployee,
  setEmployeeFilters,
  resetEmployeeFilters,
  setEmployeeError,
} = employeeSlice.actions;

export default employeeSlice.reducer;

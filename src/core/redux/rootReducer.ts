import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { employeeReducer } from './employee';
import horizontalOrgReducer from './horizontal-org/horizontal-org.slice';
import { baseApi } from '@/core/api';

export const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  horizontalOrg: horizontalOrgReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

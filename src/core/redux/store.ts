import { configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit';
import { rootReducer, type RootState } from './rootReducer';
import { baseApi } from '@/core/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

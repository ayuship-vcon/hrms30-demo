import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

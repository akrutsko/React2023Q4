import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';

export * from './useFetchPerson';
export * from './useFetchPersons';
export * from './usePersons';
export * from './usePersonsDispatch';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

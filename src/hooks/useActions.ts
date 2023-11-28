import { bindActionCreators } from '@reduxjs/toolkit';
import { formsReducer } from '../store/slices/formsSlice';
import { useAppDispatch } from './hooks';

export function useActions() {
  const dispatch = useAppDispatch();

  return bindActionCreators(
    {
      formsReducer,
    },
    dispatch,
  );
}

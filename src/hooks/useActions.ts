import { bindActionCreators } from '@reduxjs/toolkit';
import { addForm } from '../store/slices/formsSlice';
import { useAppDispatch } from './hooks';

export function useActions() {
  const dispatch = useAppDispatch();

  return bindActionCreators({ addForm }, dispatch);
}

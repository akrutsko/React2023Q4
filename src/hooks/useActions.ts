import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '.';
import { limitChanged } from '../features/limitSlice';
import { loadingDetails, loadingMain } from '../features/loadingSlice';
import { pageUpdated } from '../features/pageSlice';
import { searchChanged, searchCleared } from '../features/searchSlice';

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      limitChanged,
      loadingMain,
      loadingDetails,
      pageUpdated,
      searchChanged,
      searchCleared,
    },
    dispatch,
  );
};

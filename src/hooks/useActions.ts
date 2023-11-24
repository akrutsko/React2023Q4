import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '.';
import { loadingDetails, loadingMain } from '../features/loadingSlice';

const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      loadingMain,
      loadingDetails,
    },
    dispatch,
  );
};

export default useActions;

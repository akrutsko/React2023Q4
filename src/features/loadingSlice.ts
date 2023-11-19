import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type LoadingState = {
  main: boolean;
  details: boolean;
};

const initialState: LoadingState = {
  main: false,
  details: false,
};

const loadSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingMain(state, action: PayloadAction<boolean>) {
      state.main = action.payload;
    },
    loadingDetails(state, action: PayloadAction<boolean>) {
      state.details = action.payload;
    },
  },
});

export const { loadingMain, loadingDetails } = loadSlice.actions;
export const selectLoadingMain = (state: RootState) => state.loading.main;
export const selectLoadingDetails = (state: RootState) => state.loading.details;
export default loadSlice.reducer;

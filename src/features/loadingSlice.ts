import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

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
    loadingMain(state: LoadingState, action: PayloadAction<boolean>) {
      state.main = action.payload;
    },
    loadingDetails(state: LoadingState, action: PayloadAction<boolean>) {
      state.details = action.payload;
    },
  },
});

export const { loadingMain, loadingDetails } = loadSlice.actions;
export const selectLoadingMain = (state: RootState) => state.loading.main;
export const selectLoadingDetails = (state: RootState) => state.loading.details;
export default loadSlice.reducer;

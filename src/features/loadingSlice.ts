import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type LoadingState = {
  loading: {
    main: boolean;
    details: boolean;
  };
};

const initialState: LoadingState = {
  loading: {
    main: false,
    details: false,
  },
};

const loadSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingMain: (state: LoadingState, action: PayloadAction<boolean>) => {
      state.loading.main = action.payload;
    },
    loadingDetails: (state: LoadingState, action: PayloadAction<boolean>) => {
      state.loading.details = action.payload;
    },
  },
});

export const { loadingMain, loadingDetails } = loadSlice.actions;
export default loadSlice.reducer;

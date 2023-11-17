import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type PageState = {
  currentPage: number;
};

const initialState: PageState = {
  currentPage: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    pageUpdated(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { pageUpdated } = pageSlice.actions;
export const selectPage = (state: RootState) => state.page.currentPage;
export default pageSlice.reducer;

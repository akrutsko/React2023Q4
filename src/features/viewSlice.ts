import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type ViewState = {
  mode: boolean;
};

const initialState: ViewState = {
  mode: false,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    viewDisplayed(state, action: PayloadAction<boolean>) {
      state.mode = action.payload;
    },
  },
});

export const { viewDisplayed } = viewSlice.actions;
export const selectView = (state: RootState) => state.view.mode;
export default viewSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    viewDisplayed: (state: ViewState, action: PayloadAction<boolean>) => {
      state.mode = action.payload;
    },
  },
});

export const { viewDisplayed } = viewSlice.actions;
export default viewSlice.reducer;

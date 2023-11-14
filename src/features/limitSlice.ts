import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type LimitState = {
  limit: number;
};

const initialState: LimitState = {
  limit: 10,
};

const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    limitChanged: (state: LimitState, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const { limitChanged } = limitSlice.actions;
export default limitSlice.reducer;

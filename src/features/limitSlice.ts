import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

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
    limitChanged(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { limitChanged } = limitSlice.actions;
export const selectLimit = (state: RootState) => state.limit.limit;
export default limitSlice.reducer;

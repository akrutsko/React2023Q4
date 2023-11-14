import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ItemsPerPageState = {
  limit: number;
};

const initialState: ItemsPerPageState = {
  limit: 10,
};

const itemsPerPageSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setItemsPerPage: (
      state: ItemsPerPageState,
      action: PayloadAction<number>,
    ) => {
      state.limit = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;

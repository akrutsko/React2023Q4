import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type SearchState = {
  searchTerm: string;
};

const initialState: SearchState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchChanged(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    searchCleared(state) {
      state.searchTerm = '';
    },
  },
});

export const { searchChanged, searchCleared } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search.searchTerm;
export default searchSlice.reducer;

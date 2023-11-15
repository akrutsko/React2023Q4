import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchTerm } from '../services/local-storage';
import { RootState } from '../app/store';

type SearchState = {
  searchTerm: string;
};

const initialState: SearchState = {
  searchTerm: getSearchTerm(),
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchChanged: (state: SearchState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    searchCleared: (state: SearchState) => {
      state.searchTerm = '';
    },
  },
});

export const { searchChanged, searchCleared } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search.searchTerm;
export default searchSlice.reducer;

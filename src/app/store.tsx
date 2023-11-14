import { configureStore } from '@reduxjs/toolkit';
import { itemsPerPageReducer, searchReducer } from '../features';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    itemsPerPage: itemsPerPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import {
  limitReducer,
  loadingReducer,
  searchReducer,
  viewReducer,
} from '../features';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    limit: limitReducer,
    view: viewReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

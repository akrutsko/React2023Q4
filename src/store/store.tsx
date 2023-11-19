import { configureStore } from '@reduxjs/toolkit';
import {
  limitReducer,
  loadingReducer,
  pageReducer,
  searchReducer,
} from '../features';
import { peopleApi } from '../features/api/peopleApi';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    limit: limitReducer,
    loading: loadingReducer,
    page: pageReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

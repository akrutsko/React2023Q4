import { configureStore } from '@reduxjs/toolkit';
import {
  limitReducer,
  loadingReducer,
  pageReducer,
  searchReducer,
  viewReducer,
} from '../features';
import { peopleApi } from '../services/api';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    limit: limitReducer,
    view: viewReducer,
    loading: loadingReducer,
    page: pageReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

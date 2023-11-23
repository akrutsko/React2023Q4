import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  limitReducer,
  loadingReducer,
  pageReducer,
  searchReducer,
} from '../features';
import { peopleApi } from '../features/api/peopleApi';

export const makeStore = () =>
  configureStore({
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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);

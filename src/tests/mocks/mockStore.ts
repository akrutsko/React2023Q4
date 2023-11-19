import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../../features';

export const mockStore = configureStore({ reducer: { search: searchReducer } });

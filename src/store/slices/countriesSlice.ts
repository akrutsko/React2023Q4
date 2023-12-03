import countries from '../../data/countries.json';

import { createSlice } from '@reduxjs/toolkit';
import type { Country } from '../../types';
import type { RootState } from '../store';

type initialState = Country[];

const initialState = countries;

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries;

export const countriesReducer = countriesSlice.reducer;

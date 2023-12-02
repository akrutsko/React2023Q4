import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SliceForm } from '../../types';

type InitialState = SliceForm[];

const initialState: InitialState = [];

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: {
      reducer(state, action: PayloadAction<SliceForm>) {
        state.push(action.payload);
      },
      prepare(form: Omit<SliceForm, 'createdAt'>) {
        return {
          payload: {
            ...form,
            createdAt: Date.now(),
          },
        };
      },
    },
  },
});

export const { addForm } = formsSlice.actions;

export const formsReducer = formsSlice.reducer;

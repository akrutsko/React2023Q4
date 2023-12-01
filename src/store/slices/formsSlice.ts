import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Form } from '../../types/form';

type InitialState = Form[];

const initialState: InitialState = [];

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: {
      reducer(state, action: PayloadAction<Form>) {
        state.push(action.payload);
      },
      prepare(form: Omit<Form, 'createdAt'>) {
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

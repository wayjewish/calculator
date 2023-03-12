import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalcNamesItems } from '../../components/calculator/types';

export interface CalculatorState {
  items: CalcNamesItems[];
}

const initialState: CalculatorState = {
  items: [],
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CalcNamesItems>) => {
      const index = state.items.indexOf(action.payload);
      if (index === -1) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CalcNamesItems>) => {
      const index = state.items.indexOf(action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = calculatorSlice.actions;

export default calculatorSlice.reducer;

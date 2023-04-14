import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalcItemId } from '../../components/calculator/types';

export interface CalculatorState {
  items: CalcItemId[];
}

const initialState: CalculatorState = {
  items: [],
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: CalcItemId; index: number | null }>) => {
      const { id, index } = action.payload;

      const indexOf = state.items.indexOf(id);
      if (indexOf !== -1) {
        state.items.splice(indexOf, 1);
      }

      console.log('addItem', id, index);

      const newIndex = index !== null ? index : state.items.length;
      state.items.splice(newIndex, 0, id);
    },
    removeItem: (state, action: PayloadAction<CalcItemId>) => {
      const index = state.items.indexOf(action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = calculatorSlice.actions;

export default calculatorSlice.reducer;

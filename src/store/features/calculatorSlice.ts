import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalcItemId } from '../../components/calculator/types';
import { ModeId } from '../../components/mode/types';

export interface CalculatorState {
  mode: ModeId;
  items: CalcItemId[];
  insertIndex: number | null;
}

const initialState: CalculatorState = {
  mode: ModeId.runtime,
  items: [],
  insertIndex: null,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<ModeId>) => {
      state.mode = action.payload;
    },
    addItem: (state, action: PayloadAction<{ id: CalcItemId; index: number | null }>) => {
      const { id, index } = action.payload;

      const indexOf = state.items.indexOf(id);
      if (indexOf !== -1) {
        state.items.splice(indexOf, 1);
      }

      const newIndex = index !== null ? index : state.items.length;
      state.items.splice(newIndex, 0, id);
    },
    removeItem: (state, action: PayloadAction<CalcItemId>) => {
      const index = state.items.indexOf(action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    setInsertIndex: (state, action: PayloadAction<number | null>) => {
      state.insertIndex = action.payload;
    },
  },
});

export const { changeMode, addItem, removeItem, setInsertIndex } = calculatorSlice.actions;

export default calculatorSlice.reducer;

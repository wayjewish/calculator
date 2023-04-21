import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalcItemId } from '../../components/calculator/types';
import { ModeId } from '../../components/mode/types';

export interface CalculatorState {
  mode: ModeId;
  items: CalcItemId[];
  insertIndex: number | null;
  firstValue: string | null;
  secondValue: string | null;
  resultValue: string | null;
  operator: string | null;
}

const initialState: CalculatorState = {
  mode: ModeId.constructor,
  items: [],
  insertIndex: null,
  firstValue: null,
  secondValue: null,
  resultValue: null,
  operator: null,
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
    setFirstValue: (state, action: PayloadAction<string | null>) => {
      state.firstValue = action.payload;
    },
    setSecondValue: (state, action: PayloadAction<string | null>) => {
      state.secondValue = action.payload;
    },
    setResultValue: (state, action: PayloadAction<string | null>) => {
      state.resultValue = action.payload;
    },
    setOperator: (state, action: PayloadAction<string | null>) => {
      state.operator = action.payload;
    },
    calculate: (state) => {
      const { firstValue, operator, secondValue } = state;
      if (firstValue === null || operator === null || secondValue === null) return;

      const firstNumber = Number(state.firstValue);
      const secondNumber = Number(state.secondValue);

      switch (operator) {
        case '/':
          state.resultValue = (firstNumber / secondNumber).toString();
          break;
        case 'х':
          state.resultValue = (firstNumber * secondNumber).toString();
          break;
        case '-':
          state.resultValue = (firstNumber - secondNumber).toString();
          break;
        case '+':
          state.resultValue = (firstNumber + secondNumber).toString();
          break;
      }
    },
  },
});

export const {
  changeMode,
  addItem,
  removeItem,
  setInsertIndex,
  setFirstValue,
  setSecondValue,
  setResultValue,
  calculate,
  setOperator,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;

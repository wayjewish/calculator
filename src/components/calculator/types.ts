export enum CalcNamesItems {
  display = 'Display',
  operations = 'Operations',
  numbers = 'Numbers',
  equals = 'Equals',
}

export type CalcItem = {
  id: CalcNamesItems;
  index: number;
};

export const calcTypeItem = 'item';

export enum CalcItemId {
  display = 'Display',
  operations = 'Operations',
  numbers = 'Numbers',
  equals = 'Equals',
}

export type CalcItem = {
  id: CalcItemId;
  index: number;
};

export const calcItemType = 'item';

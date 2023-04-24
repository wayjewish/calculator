import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { CalcItem, CalcItemId } from '../calculator/types';
import { ModeId } from '../mode/types';

import Item from './item/Item';

import styles from './Palette.module.scss';

const itemsDefault: CalcItem[] = [
  {
    id: CalcItemId.display,
    index: 0,
  },
  {
    id: CalcItemId.operations,
    index: 1,
  },
  {
    id: CalcItemId.numbers,
    index: 2,
  },
  {
    id: CalcItemId.equals,
    index: 3,
  },
];

const Palette: React.FC = () => {
  const { mode } = useAppSelector((state) => state.calculator);

  return (
    <div className={styles.palette}>
      {mode === ModeId.constructor && itemsDefault.map((item: CalcItem) => <Item key={item.id} item={item} />)}
    </div>
  );
};

export default Palette;

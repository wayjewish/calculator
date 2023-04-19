import React from 'react';
import { CalcItem, CalcItemId } from '../calculator/types';
import Item from './item/Item';

import styles from './Sidebar.module.scss';

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

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      {itemsDefault.map((item: CalcItem) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { CalcItem, CalcItemId, calcItemType } from '../types';

import Drag from '../../dnd/drag/Drag';
import Card from '../../ui/card/Card';
import CalculatorItem from '../calculatorItem/CalculatorItem';

import styles from './List.module.scss';

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

const List: React.FC = () => {
  const { items } = useAppSelector((state) => state.calculator);

  return (
    <div className={styles.list}>
      {itemsDefault.map((item: CalcItem) => {
        //console.log(items, item.id, !items.includes(item.id));
        const isActive = items.includes(item.id);

        return (
          <Drag key={item.id} type={calcItemType} item={item} canDrag={!isActive}>
            <Card notActive={isActive}>
              <CalculatorItem id={item.id} />
            </Card>
          </Drag>
        );
      })}
    </div>
  );
};

export default List;

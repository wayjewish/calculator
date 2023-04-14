import React from 'react';
import Card from '../../ui/card/Card';
import Display from '../../calculator/display/Display';
import Operations from '../../calculator/operations/Operations';
import Numbers from '../../calculator/numbers/Numbers';
import Equals from '../../calculator/equals/Equals';
import Drag from '../../dnd/drag/Drag';

import { useAppSelector } from '../../../store/hooks';

import { CalcItem, CalcItemId, calcItemType } from '../../calculator/types';
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
        console.log(items, item.id, !items.includes(item.id));

        const isActive = items.includes(item.id);

        switch (item.id) {
          case CalcItemId.display:
            return (
              <Drag key={item.id} type={calcItemType} item={item} canDrag={!isActive}>
                <Card notActive={isActive}>
                  <Display />
                </Card>
              </Drag>
            );
          case CalcItemId.operations:
            return (
              <Drag key={item.id} type={calcItemType} item={item} canDrag={!isActive}>
                <Card notActive={isActive}>
                  <Operations />
                </Card>
              </Drag>
            );
          case CalcItemId.numbers:
            return (
              <Drag key={item.id} type={calcItemType} item={item} canDrag={!isActive}>
                <Card notActive={isActive}>
                  <Numbers />
                </Card>
              </Drag>
            );
          case CalcItemId.equals:
            return (
              <Drag key={item.id} type={calcItemType} item={item} canDrag={!isActive}>
                <Card notActive={isActive}>
                  <Equals />
                </Card>
              </Drag>
            );
        }
      })}
    </div>
  );
};

export default List;

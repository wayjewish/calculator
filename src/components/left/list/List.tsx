import React from 'react';
import Card from '../../ui/card/Card';
import Display from '../../calculator/display/Display';
import Operations from '../../calculator/operations/Operations';
import Numbers from '../../calculator/numbers/Numbers';
import Equals from '../../calculator/equals/Equals';
import Drag from '../../dnd/drag/Drag';

import { useAppSelector } from '../../../store/hooks';

import { CalcItem, CalcNamesItems, calcTypeItem } from '../../calculator/types';
import styles from './List.module.scss';

const itemsDefault: CalcItem[] = [
  {
    id: CalcNamesItems.display,
    index: 0,
  },
  {
    id: CalcNamesItems.operations,
    index: 1,
  },
  {
    id: CalcNamesItems.numbers,
    index: 2,
  },
  {
    id: CalcNamesItems.equals,
    index: 3,
  },
];

const List: React.FC = () => {
  const { items } = useAppSelector((state) => state.calculator);

  return (
    <div className={styles.list}>
      {itemsDefault.map((item: CalcItem) => {
        console.log(items, item.id, !items.includes(item.id));
        switch (item.id) {
          case CalcNamesItems.display:
            return (
              <Drag key={item.id} type={calcTypeItem} item={item} canDrag={!items.includes(item.id)}>
                <Card notActive={items.includes(item.id)}>
                  <Display />
                </Card>
              </Drag>
            );
          case CalcNamesItems.operations:
            return (
              <Drag key={item.id} type={calcTypeItem} item={item} canDrag={!items.includes(item.id)}>
                <Card notActive={items.includes(item.id)}>
                  <Operations />
                </Card>
              </Drag>
            );
          case CalcNamesItems.numbers:
            return (
              <Drag key={item.id} type={calcTypeItem} item={item} canDrag={!items.includes(item.id)}>
                <Card notActive={items.includes(item.id)}>
                  <Numbers />
                </Card>
              </Drag>
            );
          case CalcNamesItems.equals:
            return (
              <Drag key={item.id} type={calcTypeItem} item={item} canDrag={!items.includes(item.id)}>
                <Card notActive={items.includes(item.id)}>
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

import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../../../store/hooks';
import { CalcItem, calcItemType } from '../../calculator/types';

import Card from '../../ui/card/Card';
import CalculatorItem from '../../calculator/item/Item';

type Props = {
  item: CalcItem;
};

const Item: React.FC<Props> = ({ item }) => {
  const { items } = useAppSelector((state) => state.calculator);
  const isActive = items.includes(item.id);

  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(() => ({
    type: calcItemType,
    item: item,
  }));

  drag(ref);

  return (
    <div ref={ref}>
      <Card notActive={isActive} notShadow={isActive} notDrop={isActive}>
        <CalculatorItem id={item.id} />
      </Card>
    </div>
  );
};

export default Item;

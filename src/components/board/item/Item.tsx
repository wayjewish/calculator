import React, { useRef } from 'react';
import CalculatorItem from '../../calculator/item/Item';
import { CalcItem, calcItemType } from '../../calculator/types';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeItem, setInsertIndex } from '../../../store/features/calculatorSlice';
import Card from '../../ui/card/Card';

type Props = {
  item: CalcItem;
};

const Item: React.FC<Props> = ({ item }) => {
  const { items, insertIndex } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: calcItemType,
      hover: (itemActive: CalcItem, monitor) => {
        if (!ref.current) return;
        if (itemActive.id === item.id) return;

        const boundingRect = ref.current.getBoundingClientRect();
        const middleY = (boundingRect.bottom - boundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();
        const clientY = (clientOffset as XYCoord).y - boundingRect.top;

        if (
          (clientY > middleY && itemActive.index === item.index + 1) ||
          (clientY < middleY && itemActive.index === item.index - 1)
        ) {
          return;
        }

        let index = item.index;
        if (clientY > middleY) index++;
        dispatch(setInsertIndex(index));
      },
    }),
    [items, insertIndex],
  );

  const [, drag] = useDrag(() => ({
    type: calcItemType,
    item: item,
  }));

  const handleDoubleClick = () => {
    dispatch(removeItem(item.id));
  };

  drop(ref);
  drag(ref);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        if (e.detail === 2) handleDoubleClick();
      }}
    >
      <Card>
        <CalculatorItem id={item.id} />
      </Card>
    </div>
  );
};

export default Item;

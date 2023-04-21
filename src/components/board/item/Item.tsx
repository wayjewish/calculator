import React, { useRef } from 'react';
import CalculatorItem from '../../calculator/item/Item';
import { CalcItem, CalcItemId, calcItemType } from '../../calculator/types';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeItem, setInsertIndex } from '../../../store/features/calculatorSlice';
import Card from '../../ui/card/Card';
import { ModeId } from '../../mode/types';

type Props = {
  item: CalcItem;
};

const Item: React.FC<Props> = ({ item }) => {
  const { items, insertIndex, mode } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: calcItemType,
      hover: (itemDrag: CalcItem, monitor) => {
        if (itemDrag.id === CalcItemId.display) {
          dispatch(setInsertIndex(0));
          return;
        }

        if (!ref.current) return;
        if (itemDrag.id === item.id) return;

        let index = item.index;

        const boundingRect = ref.current.getBoundingClientRect();
        const middleY = (boundingRect.bottom - boundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();
        const clientY = (clientOffset as XYCoord).y - boundingRect.top;

        if (
          (clientY > middleY && itemDrag.index === item.index + 1) ||
          (clientY < middleY && itemDrag.index === item.index - 1)
        ) {
          return;
        }

        if (clientY < middleY && item.id === CalcItemId.display) return;
        if (clientY > middleY) index++;

        dispatch(setInsertIndex(index));
      },
    }),
    [items, insertIndex],
  );

  const [, drag] = useDrag(
    () => ({
      type: calcItemType,
      item: item,
      canDrag: item.id !== CalcItemId.display && mode === ModeId.constructor,
    }),
    [items, insertIndex, mode],
  );

  const handleDoubleClick = () => {
    if (mode === ModeId.constructor) dispatch(removeItem(item.id));
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

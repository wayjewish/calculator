import React, { ReactNode, useRef } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { CalcItem } from '../../calculator/types';

import styles from './DropItem.module.scss';
import { addItem } from '../../../store/features/calculatorSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type Props = {
  children: ReactNode;
  accept: string;
  item: CalcItem;
  setInsertIndex: (index: number) => void;
};

const DropItem: React.FC<Props> = ({ children, accept, item, setInsertIndex }) => {
  const { items } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: accept,
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
        setInsertIndex(index);
      },
    }),
    [items],
  );

  drop(ref);

  return (
    <div ref={ref} className={styles.drop}>
      {children}
    </div>
  );
};

export default DropItem;

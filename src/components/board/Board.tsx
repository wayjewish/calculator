import React, { useEffect, useRef } from 'react';
import { XYCoord, useDrop } from 'react-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addItem, setInsertIndex } from '../../store/features/calculatorSlice';
import { CalcItem, CalcItemId, calcItemType } from '../calculator/types';
import { ModeId } from '../mode/types';

import Item from './item/Item';
import DropZone from './dropZone/DropZone';
import InsertPoint from './insertPoint/InsertPoint';

import styles from './Board.module.scss';

const Board: React.FC = () => {
  const { items, insertIndex, mode } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const refBoard = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLDivElement>(null);

  const [{ isOver }, dropBoard] = useDrop(
    () => ({
      accept: calcItemType,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (item: CalcItem) => {
        if (items.length > 0 && insertIndex === null) return;
        dispatch(addItem({ id: item.id, index: insertIndex }));
        dispatch(setInsertIndex(null));
      },
      hover: (item: CalcItem, monitor) => {
        if (item.id === CalcItemId.display) {
          dispatch(setInsertIndex(0));
          return;
        }

        if (!refList.current) return;
        if (items.includes(item.id) && item.index === items.length - 1) return;
        if (insertIndex === items.length) return;

        const boundingRect = refList.current.getBoundingClientRect();
        const bottomY = boundingRect.bottom - boundingRect.top;

        const clientOffset = monitor.getClientOffset();
        const clientY = (clientOffset as XYCoord).y - boundingRect.top;

        if (!(clientY > bottomY)) return;
        dispatch(setInsertIndex(items.length));
      },
    }),
    [items, insertIndex],
  );

  useEffect(() => {
    if (!isOver) dispatch(setInsertIndex(null));
  }, [isOver]);

  dropBoard(refBoard);

  return (
    <div ref={refBoard} className={styles.board}>
      {items.length > 0 && (
        <div ref={refList} className={styles.board__list}>
          {items.map((id: CalcItemId, index) => {
            const item: CalcItem = { id: id, index: index };

            return (
              <div key={id}>
                {insertIndex === index && <InsertPoint />}
                <Item item={item} />
              </div>
            );
          })}

          {insertIndex === items.length && <InsertPoint isLast={true} />}
        </div>
      )}

      {mode === ModeId.constructor && !(items.length > 0) && <DropZone isOver={isOver} />}
    </div>
  );
};

export default Board;

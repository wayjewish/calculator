import React, { useEffect, useRef, useState } from 'react';
import { XYCoord, useDrop } from 'react-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addItem, setInsertIndex } from '../../store/features/calculatorSlice';
import { CalcItem, CalcItemId, calcItemType } from '../calculator/types';

import Item from './item/Item';
import DropZone from '../ui/dropZone/DropZone';

import styles from './Board.module.scss';

const Board: React.FC = () => {
  const { items, insertIndex } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const refBoard = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLDivElement>(null);

  const [{ isOver, isOverShallow }, dropBoard] = useDrop(
    () => ({
      accept: calcItemType,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverShallow: monitor.isOver({ shallow: true }),
      }),
      drop: (item: CalcItem) => {
        console.log('Board drop');
        dispatch(addItem({ id: item.id, index: insertIndex }));
        dispatch(setInsertIndex(null));
      },
      hover: (item: CalcItem, monitor) => {
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
    console.log('insertIndex', insertIndex);
  }, [insertIndex]);

  useEffect(() => {
    console.log('isOver', isOver);
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
                {insertIndex === index && <>insert</>}
                <Item item={item} />
              </div>
            );
          })}

          {insertIndex === items.length && <>insert</>}
        </div>
      )}

      {!(items.length > 0) && <DropZone isOver={isOver} />}
    </div>
  );
};

export default Board;

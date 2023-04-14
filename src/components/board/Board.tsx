import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/features/calculatorSlice';

import DropZone from '../ui/dropZone/DropZone';
import { CalcItem, CalcItemId, calcItemType } from '../calculator/types';

import styles from './Board.module.scss';
import Display from '../calculator/display/Display';
import Operations from '../calculator/operations/Operations';
import Numbers from '../calculator/numbers/Numbers';
import Equals from '../calculator/equals/Equals';
import Drag from '../dnd/drag/Drag';
import Card from '../ui/card/Card';
import DropItem from '../dnd/dropItem/DropItem';

const Board: React.FC = () => {
  const { items } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: calcItemType,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (item: CalcItem) => {
        dispatch(addItem({ id: item.id, index: insertIndex }));
      },
    }),
    [insertIndex],
  );

  useEffect(() => {
    if (!isOver) setInsertIndex(null);
  }, [isOver]);

  const renderCalendarComponent = (id: CalcItemId) => {
    switch (id) {
      case CalcItemId.display:
        return <Display />;
      case CalcItemId.operations:
        return <Operations />;
      case CalcItemId.numbers:
        return <Numbers />;
      case CalcItemId.equals:
        return <Equals />;
    }
  };

  return (
    <div ref={drop} className={styles.board}>
      {items.length > 0 && (
        <>
          {items.map((id: CalcItemId, index) => {
            const item: CalcItem = { id: id, index: index };

            return (
              <div key={id}>
                <DropItem accept={calcItemType} item={item} setInsertIndex={(index: number) => setInsertIndex(index)}>
                  <Drag type={calcItemType} item={item}>
                    {insertIndex === index && <>insert</>}
                    <Card>{renderCalendarComponent(id)}</Card>
                  </Drag>
                </DropItem>
              </div>
            );
          })}

          {insertIndex !== null && insertIndex === items.length && <>insert</>}
        </>
      )}

      {!(items.length > 0) && <DropZone isOver={isOver} />}
    </div>
  );
};

export default Board;

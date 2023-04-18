import React, { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/features/calculatorSlice';
import { CalcItem, CalcItemId, calcItemType } from '../calculator/types';

import Drag from '../dnd/drag/Drag';
import DropItem from '../dnd/dropItem/DropItem';
import DropZone from '../ui/dropZone/DropZone';
import Card from '../ui/card/Card';
import CalculatorItem from '../calculator/calculatorItem/CalculatorItem';

import styles from './Board.module.scss';

const Board: React.FC = () => {
  const { items } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const [{ isOver, isOverShallow }, drop] = useDrop(
    () => ({
      accept: calcItemType,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverShallow: monitor.isOver({ shallow: true }),
      }),
      drop: (item: CalcItem) => {
        console.log('Board drop');
        dispatch(addItem({ id: item.id, index: insertIndex }));
        setInsertIndex(null);
      },
      hover: (item: CalcItem) => {
        //console.log('Board hover', item.index, items.length);

        if (!ref.current) return;
        if (!(items.length > 0)) return;
        if (item.index === items.length - 1) return;

        setInsertIndex(items.length);
      },
    }),
    [insertIndex, items],
  );

  useEffect(() => {
    console.log('insertIndex', insertIndex);
  }, [insertIndex]);

  /*useEffect(() => {
    console.log('isOver', isOver);
    if (!isOver) setInsertIndex(null);
  }, [isOver]);*/

  useEffect(() => {
    console.log('isOverShallow', isOverShallow);
  }, [isOverShallow]);

  drop(ref);

  return (
    <div ref={ref} className={styles.board}>
      {items.length > 0 && (
        <div
          className={styles.board__list}
          onMouseEnter={() => {
            console.log('onMouseEnter');
          }}
          onMouseLeave={() => {
            console.log('onMouseLeave');
          }}
        >
          {items.map((id: CalcItemId, index) => {
            const item: CalcItem = { id: id, index: index };

            return (
              <div key={id}>
                {insertIndex === index && <>insert</>}
                <DropItem accept={calcItemType} item={item} setInsertIndex={(index: number) => setInsertIndex(index)}>
                  <Drag type={calcItemType} item={item}>
                    <Card>
                      <CalculatorItem id={id} />
                    </Card>
                  </Drag>
                </DropItem>
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

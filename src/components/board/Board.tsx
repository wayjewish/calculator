import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/features/calculatorSlice';

import DropZone from '../ui/dropZone/DropZone';
import { CalcItem, CalcNamesItems, calcTypeItem } from '../calculator/types';

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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: calcTypeItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: CalcItem) => {
      console.log('dropBoard', item);
      dispatch(addItem(item.id));
    },
    hover() {
      if (insertIndex === null) setInsertIndex(items.length);
    },
  }));

  const resInsertIndex = (index: number | null) => {
    if (index === null && insertIndex !== null) {
      setInsertIndex(null);
      return;
    }

    setInsertIndex(index);
  };

  useEffect(() => {
    console.log('insertIndex', insertIndex);
  }, [insertIndex]);

  return (
    <div ref={drop} className={styles.board}>
      {items.length > 0 && (
        <>
          {items.map((id: CalcNamesItems, index) => {
            const item: CalcItem = { id: id, index: index };

            switch (id) {
              case CalcNamesItems.display:
                return (
                  <div key={id}>
                    <DropItem
                      accept={calcTypeItem}
                      item={item}
                      resInsertIndex={(index: number | null) => resInsertIndex(index)}
                    >
                      <Drag type={calcTypeItem} item={item} end={() => resInsertIndex(null)}>
                        {insertIndex === index && <>insert</>}
                        <Card>
                          <Display />
                        </Card>
                      </Drag>
                    </DropItem>
                  </div>
                );
              case CalcNamesItems.operations:
                return (
                  <div key={id}>
                    <DropItem
                      accept={calcTypeItem}
                      item={item}
                      resInsertIndex={(index: number | null) => resInsertIndex(index)}
                    >
                      <Drag type={calcTypeItem} item={item} end={() => resInsertIndex(null)}>
                        {insertIndex === index && <>insert</>}
                        <Card>
                          <Operations />
                        </Card>
                      </Drag>
                    </DropItem>
                  </div>
                );
              case CalcNamesItems.numbers:
                return (
                  <div key={id}>
                    <DropItem
                      accept={calcTypeItem}
                      item={item}
                      resInsertIndex={(index: number | null) => resInsertIndex(index)}
                    >
                      <Drag type={calcTypeItem} item={item} end={() => resInsertIndex(null)}>
                        {insertIndex === index && <>insert</>}
                        <Card>
                          <Numbers />
                        </Card>
                      </Drag>
                    </DropItem>
                  </div>
                );
              case CalcNamesItems.equals:
                return (
                  <div key={id}>
                    <DropItem
                      accept={calcTypeItem}
                      item={item}
                      resInsertIndex={(index: number | null) => resInsertIndex(index)}
                    >
                      <Drag type={calcTypeItem} item={item} end={() => resInsertIndex(null)}>
                        {insertIndex === index && <>insert</>}
                        <Card>
                          <Equals />
                        </Card>
                      </Drag>
                    </DropItem>
                  </div>
                );
            }
          })}
          {insertIndex !== null && insertIndex === items.length && <>insert</>}
        </>
      )}

      {!(items.length > 0) && <DropZone isOver={isOver} />}
    </div>
  );
};

export default Board;

import React from 'react';
import DropZone from '../ui/dropZone/DropZone';

import { calcTypeItem } from '../calculator/types';
import styles from './Board.module.scss';
import { useDrop } from 'react-dnd';

const Board: React.FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: calcTypeItem,
    drop: (item) => {
      console.log('drop', item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className={styles.board}>
      <DropZone isOver={isOver} />
    </div>
  );
};

export default Board;

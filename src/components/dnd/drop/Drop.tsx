import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

import styles from './Drop.module.scss';

type Props = {
  children: ReactNode;
  accept: string;
};

const Drop: React.FC<Props> = ({ children, accept }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: accept,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className={styles.drop}>
      {children}
    </div>
  );
};

export default Drop;

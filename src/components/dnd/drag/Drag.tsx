import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd';

import styles from './Drag.module.scss';

import { CalcNamesItems } from '../../calculator/types';

type Props = {
  children: ReactNode;
  type: string;
  name: CalcNamesItems;
  canDrag?: boolean;
};

const Drag: React.FC<Props> = ({ children, type, name, canDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { name: name },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={styles.drag}>
      {children}
    </div>
  );
};

export default Drag;

import React, { ReactNode } from 'react';
import { useDrag } from 'react-dnd';

import styles from './Drag.module.scss';

import { CalcItem } from '../../calculator/types';

type Props = {
  children: ReactNode;
  type: string;
  item: CalcItem;
  canDrag?: boolean;
  end?: () => void;
};

const Drag: React.FC<Props> = ({ children, type, item, canDrag, end }) => {
  const [, drag] = useDrag({
    type: type,
    item: item,
    canDrag: canDrag,
    end() {
      if (end) end();
      console.log('end');
    },
  });

  return (
    <div ref={drag} className={styles.drag}>
      {children}
    </div>
  );
};

export default Drag;

import React, { ReactNode, useRef } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { CalcItem } from '../../calculator/types';

import styles from './DropItem.module.scss';

type Props = {
  children: ReactNode;
  accept: string;
  item: CalcItem;
  resInsertIndex: (index: number | null) => void;
};

const DropItem: React.FC<Props> = ({ children, accept, item, resInsertIndex }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: accept,
    drop: (itemActive: CalcItem) => {
      console.log('dropItem', itemActive, item);
      //dispatch(addItem(item.name));

      resInsertIndex(null);
    },
    hover(itemActive: CalcItem, monitor) {
      //console.log('hover', itemActive, item);

      if (!ref.current) return;
      if (itemActive.id === item.id) return;

      let index = item.index;

      const boundingRect = ref.current.getBoundingClientRect();
      const middleY = (boundingRect.bottom - boundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const clientY = (clientOffset as XYCoord).y - boundingRect.top;

      //console.log(hoverMiddleY, hoverClientY);

      if (
        (clientY > middleY && itemActive.index === item.index + 1) ||
        (clientY < middleY && itemActive.index === item.index - 1)
      ) {
        return;
      }
      if (clientY > middleY) index++;

      console.log(clientY < middleY, clientY > middleY, index);

      resInsertIndex(index);
    },
  }));

  drop(ref);

  return (
    <div ref={ref} className={styles.drop}>
      {children}
    </div>
  );
};

export default DropItem;

import React, { ReactNode, useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { CalcItemId } from '../../calculator/types';
import Card from '../card/Card';
import CalculatorItem from '../../calculator/item/Item';

import styles from './DragLayer.module.scss';

type Props = {
  children?: ReactNode;
};

const DragLayer: React.FC<Props> = ({ children }) => {
  const { item, itemType, currentOffset, isDragging } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  useEffect(() => {
    console.log(item);
  }, [item]);

  if (!isDragging || !currentOffset) {
    return null;
  }

  return (
    <div className={styles.layer}>
      <div className={styles.layer__preview} style={{ top: currentOffset.y, left: currentOffset.x }}>
        <Card>
          <CalculatorItem id={item.id} />
        </Card>
      </div>
    </div>
  );
};

export default DragLayer;

import React, { ReactNode, useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import Card from '../ui/card/Card';
import CalculatorItem from '../calculator/item/Item';

import styles from './DragLayer.module.scss';

const classBodyDragging = 'body_dragging';

const DragLayer: React.FC = () => {
  const { item, isDragging, initialClientOffset, initialSourceClientOffset, сlientOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      initialClientOffset: monitor.getInitialClientOffset(),
      initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
      сlientOffset: monitor.getClientOffset(),
    }),
  );

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add(classBodyDragging);
    } else {
      if (document.body.classList.contains(classBodyDragging)) {
        document.body.classList.remove(classBodyDragging);
      }
    }
  }, [isDragging]);

  if (!isDragging || !initialClientOffset || !initialSourceClientOffset || !сlientOffset) {
    return null;
  }

  return (
    <div className={styles.layer}>
      <div
        className={styles.layer__preview}
        style={{
          top: сlientOffset.y - (initialClientOffset.y - initialSourceClientOffset.y),
          left: сlientOffset.x - (initialClientOffset.x - initialSourceClientOffset.x),
        }}
      >
        <Card>
          <CalculatorItem id={item.id} />
        </Card>
      </div>
    </div>
  );
};

export default DragLayer;

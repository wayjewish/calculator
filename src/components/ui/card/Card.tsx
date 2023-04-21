import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';

type Props = {
  children: ReactNode;
  notActive?: boolean;
  notShadow?: boolean;
  notDrop?: boolean;
};

const Card: React.FC<Props> = ({ children, notActive, notShadow, notDrop }) => {
  return (
    <div
      className={cx(styles.card, {
        [styles.card_notActive]: notActive,
        [styles.card_notShadow]: notShadow,
        [styles.card_notDrop]: notDrop,
      })}
    >
      {children}
    </div>
  );
};

export default Card;

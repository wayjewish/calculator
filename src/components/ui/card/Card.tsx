import React, { ReactNode } from 'react';

import styles from './Card.module.scss';

type Props = {
  children: ReactNode;
  notActive?: boolean;
};

const Card: React.FC<Props> = ({ children, notActive }) => {
  return <div className={`${styles.card} ${notActive && styles.card_notActive}`}>{children}</div>;
};

export default Card;

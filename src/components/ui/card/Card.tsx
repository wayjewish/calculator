import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';

type Props = {
  children: ReactNode;
  notActive?: boolean;
};

const Card: React.FC<Props> = ({ children, notActive }) => {
  return <div className={cx(styles.card, { [styles.card_notActive]: notActive })}>{children}</div>;
};

export default Card;

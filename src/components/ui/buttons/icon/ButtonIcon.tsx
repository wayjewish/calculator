import React, { ReactNode } from 'react';

import styles from './ButtonIcon.module.scss';

type Props = {
  children: ReactNode;
  isActive?: boolean;
};

const ButtonIcon: React.FC<Props> = ({ children, isActive }) => {
  return <button className={`${styles.button} ${isActive && styles.button_active}`}>{children}</button>;
};

export default ButtonIcon;

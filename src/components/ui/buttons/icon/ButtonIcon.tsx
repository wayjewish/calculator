import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from './ButtonIcon.module.scss';

type Props = {
  children: ReactNode;
  isActive?: boolean;
};

const ButtonIcon: React.FC<Props> = ({ children, isActive }) => {
  return <button className={cx(styles.button, { [styles.button_active]: isActive })}>{children}</button>;
};

export default ButtonIcon;

import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from './ButtonIcon.module.scss';

type Props = {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

const ButtonIcon: React.FC<Props> = ({ children, isActive, onClick }) => {
  return (
    <button className={cx(styles.button, { [styles.button_active]: isActive })} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonIcon;

import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  color?: string;
  cols?: number;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, color, cols, onClick }) => {
  return (
    <button
      className={cx(styles.button, { [styles[`button_${color}`]]: color, [styles[`button_${cols}col`]]: cols })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

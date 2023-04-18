import React, { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  color?: 'blue';
  cols?: 2;
};

const Button: React.FC<Props> = ({ children, color, cols }) => {
  return (
    <button className={cx(styles.button, { [styles[`button_${color}`]]: color, [styles[`button_${cols}col`]]: cols })}>
      {children}
    </button>
  );
};

export default Button;

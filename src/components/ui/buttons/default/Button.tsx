import React, { ReactNode } from 'react';

import styles from './Button.module.scss';

type Props = {
  children: ReactNode;
  color?: 'blue';
  cols?: 2;
};

const Button: React.FC<Props> = ({ children, color, cols }) => {
  const classes = [`${styles.button}`];
  if (color) classes.push(`${styles[`button_${color}`]}`);
  if (cols) classes.push(`${styles[`button_${cols}col`]}`);

  return <button className={classes.join(' ')}>{children}</button>;
};

export default Button;

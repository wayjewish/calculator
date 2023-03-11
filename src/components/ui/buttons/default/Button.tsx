import React, { ReactNode } from 'react';

import styles from './ButtonIcon.module.scss';

type Props = {
  children: ReactNode;
};

const Button: React.FC<Props> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;

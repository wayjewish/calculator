import React from 'react';
import { useAppSelector } from '../../../store/hooks';

import styles from './Display.module.scss';

const Display: React.FC = () => {
  const { firstValue, secondValue, resultValue } = useAppSelector((state) => state.calculator);

  const value = resultValue || secondValue || firstValue || 0;

  return (
    <div className={styles.display}>
      <input className={styles.display__input} type="text" value={value} readOnly />
    </div>
  );
};

export default Display;

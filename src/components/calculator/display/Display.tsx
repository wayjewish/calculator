import React from 'react';
import cx from 'classnames';

import styles from './Display.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { ModeId } from '../../mode/types';

const Display: React.FC = () => {
  const { mode, firstValue, secondValue, resultValue } = useAppSelector((state) => state.calculator);

  const value = resultValue || secondValue || firstValue || 0;

  return (
    <div className={cx(styles.display, { [styles.display_disabled]: mode === ModeId.constructor })}>
      <input className={styles.display__input} type="text" value={value} readOnly />
    </div>
  );
};

export default Display;

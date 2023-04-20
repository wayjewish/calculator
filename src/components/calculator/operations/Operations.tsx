import React from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Button from '../../ui/buttons/default/Button';

import styles from './Operations.module.scss';
import { ModeId } from '../../mode/types';

const Operations: React.FC = () => {
  const { mode } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    switch (true) {
      case :
        dispatch();
        break;
      default:
        break;
    }
  };

  return (
    <div className={cx(styles.operations, { [styles.operations_disabled]: mode === ModeId.constructor })}>
      <Button>/</Button>
      <Button>х</Button>
      <Button>-</Button>
      <Button>+</Button>
    </div>
  );
};

export default Operations;

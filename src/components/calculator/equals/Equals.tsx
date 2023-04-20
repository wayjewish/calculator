import React from 'react';
import cx from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import Button from '../../ui/buttons/default/Button';

import styles from './Equals.module.scss';
import { ModeId } from '../../mode/types';

const Equals: React.FC = () => {
  const { mode } = useAppSelector((state) => state.calculator);

  return (
    <div className={cx(styles.equals, { [styles.equals_disabled]: mode === ModeId.constructor })}>
      <Button color="blue">=</Button>
    </div>
  );
};

export default Equals;

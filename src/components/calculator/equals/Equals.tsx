import React from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Button from '../../ui/buttons/default/Button';

import styles from './Equals.module.scss';
import { ModeId } from '../../mode/types';
import { calculate, setFirstValue, setResultValue, setSecondValue } from '../../../store/features/calculatorSlice';

const Equals: React.FC = () => {
  const { mode, firstValue, secondValue, operator, resultValue } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    switch (true) {
      case resultValue !== null:
        dispatch(setFirstValue(resultValue));
        dispatch(setResultValue(null));

        dispatch(calculate());
        break;
      case secondValue === null:
        dispatch(setSecondValue(firstValue));

        dispatch(calculate());
        break;
      default:
        dispatch(calculate());
        break;
    }
  };

  return (
    <div className={cx(styles.equals, { [styles.equals_disabled]: mode === ModeId.constructor })}>
      <Button color="blue" onClick={() => handleClick()}>
        =
      </Button>
    </div>
  );
};

export default Equals;

import React from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  calculate,
  setFirstValue,
  setOperator,
  setResultValue,
  setSecondValue,
} from '../../../store/features/calculatorSlice';
import { ModeId } from '../../mode/types';
import { CalcOperator } from '../types';

import Button from '../../ui/buttons/default/Button';

import styles from './Operations.module.scss';

const Operations: React.FC = () => {
  const { mode, firstValue, secondValue, operator, resultValue } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const handleClick = (value: CalcOperator) => {
    dispatch(setOperator(value));

    switch (true) {
      case resultValue !== null:
        //dispatch(setOperator(value));

        dispatch(setFirstValue(resultValue));
        dispatch(setSecondValue(null));
        dispatch(setResultValue(null));
        break;
      case firstValue === null && operator === null:
        //dispatch(setOperator(value));

        dispatch(setFirstValue('0'));
        break;
      case firstValue !== null && operator === null:
      case firstValue !== null && operator !== null && secondValue === null:
        //dispatch(setOperator(value));
        break;
      case firstValue !== null && operator !== null && secondValue !== null:
        //dispatch(setOperator(value));

        dispatch(calculate());
        break;
    }
  };

  return (
    <div className={cx(styles.operations, { [styles.operations_disabled]: mode === ModeId.constructor })}>
      <Button onClick={() => handleClick(CalcOperator.division)}>{CalcOperator.division}</Button>
      <Button onClick={() => handleClick(CalcOperator.multiplication)}>{CalcOperator.multiplication}</Button>
      <Button onClick={() => handleClick(CalcOperator.subtraction)}>{CalcOperator.subtraction}</Button>
      <Button onClick={() => handleClick(CalcOperator.addition)}>{CalcOperator.addition}</Button>
    </div>
  );
};

export default Operations;

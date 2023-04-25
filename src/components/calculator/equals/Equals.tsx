import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { calculate, setFirstValue, setResultValue, setSecondValue } from '../../../store/features/calculatorSlice';
import { ModeId } from '../../mode/types';

import Button from '../../ui/buttons/default/Button';

import styles from './Equals.module.scss';

const Equals: React.FC = () => {
  const { mode, firstValue, secondValue, resultValue } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (mode === ModeId.constructor) return;

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
    <div className={styles.equals}>
      <Button color="blue" onClick={() => handleClick()}>
        =
      </Button>
    </div>
  );
};

export default Equals;

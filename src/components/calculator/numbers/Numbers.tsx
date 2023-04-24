import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Button from '../../ui/buttons/default/Button';

import styles from './Numbers.module.scss';
import { ModeId } from '../../mode/types';
import { setFirstValue, setSecondValue } from '../../../store/features/calculatorSlice';

const Numbers: React.FC = () => {
  const { mode, firstValue, secondValue, operator } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    if (mode === ModeId.constructor) return;

    switch (true) {
      case firstValue === null:
        dispatch(setFirstValue(value));
        break;
      case firstValue !== null && operator === null:
        dispatch(setFirstValue(firstValue + value));
        break;
      case firstValue !== null && operator !== null && secondValue === null:
        dispatch(setSecondValue(value));
        break;
      case firstValue !== null && operator !== null && secondValue !== null:
        dispatch(setSecondValue(secondValue + value));
        break;
    }
  };

  return (
    <div className={styles.numbers}>
      <Button onClick={() => handleClick('7')}>7</Button>
      <Button onClick={() => handleClick('8')}>8</Button>
      <Button onClick={() => handleClick('9')}>9</Button>
      <Button onClick={() => handleClick('4')}>4</Button>
      <Button onClick={() => handleClick('5')}>5</Button>
      <Button onClick={() => handleClick('6')}>6</Button>
      <Button onClick={() => handleClick('1')}>1</Button>
      <Button onClick={() => handleClick('2')}>2</Button>
      <Button onClick={() => handleClick('3')}>3</Button>
      <Button onClick={() => handleClick('0')} cols={2}>
        0
      </Button>
      <Button onClick={() => handleClick(',')}>,</Button>
    </div>
  );
};

export default Numbers;

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeMode,
  setFirstValue,
  setOperator,
  setResultValue,
  setSecondValue,
} from '../../store/features/calculatorSlice';
import { ModeId } from './types';

import ButtonIcon from '../ui/buttons/icon/ButtonIcon';

import styles from './Mode.module.scss';
import IconEye from '../../../public/icons/eye.svg';
import IconSelector from '../../../public/icons/selector.svg';

const Mode: React.FC = () => {
  const { mode } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const handleClick = (newMode: ModeId) => {
    if (newMode === ModeId.constructor) {
      dispatch(setFirstValue(null));
      dispatch(setSecondValue(null));
      dispatch(setOperator(null));
      dispatch(setResultValue(null));
    }

    dispatch(changeMode(newMode));
  };

  return (
    <div className={styles.mode}>
      <ButtonIcon isActive={mode === ModeId.runtime} onClick={() => handleClick(ModeId.runtime)}>
        <IconEye />
        <span>Runtime</span>
      </ButtonIcon>
      <ButtonIcon isActive={mode === ModeId.constructor} onClick={() => handleClick(ModeId.constructor)}>
        <IconSelector />
        <span>Constructor</span>
      </ButtonIcon>
    </div>
  );
};

export default Mode;

import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ModeId } from './types';
import IconEye from '../../../public/icons/eye.svg';
import IconSelector from '../../../public/icons/selector.svg';
import ButtonIcon from '../ui/buttons/icon/ButtonIcon';

import styles from './Mode.module.scss';

const Mode: React.FC = () => {
  const { mode } = useAppSelector((state) => state.calculator);

  return (
    <div className={styles.mode}>
      <ButtonIcon isActive={mode === ModeId.runtime}>
        <IconEye />
        <span>Runtime</span>
      </ButtonIcon>
      <ButtonIcon isActive={mode === ModeId.constructor}>
        <IconSelector />
        <span>Constructor</span>
      </ButtonIcon>
    </div>
  );
};

export default Mode;

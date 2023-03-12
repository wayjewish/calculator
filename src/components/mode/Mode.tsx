import React from 'react';

import IconEye from '../../../public/icons/eye.svg';
import IconSelector from '../../../public/icons/selector.svg';
import ButtonIcon from '../ui/buttons/icon/ButtonIcon';

import styles from './Mode.module.scss';

const Mode: React.FC = () => {
  return (
    <div className={styles.mode}>
      <ButtonIcon isActive={true}>
        <IconEye />
        <span>Runtime</span>
      </ButtonIcon>
      <ButtonIcon>
        <IconSelector />
        <span>Constructor</span>
      </ButtonIcon>
    </div>
  );
};

export default Mode;

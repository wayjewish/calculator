import React from 'react';
import cx from 'classnames';
import IconImg from '../../../../public/icons/img.svg';

import styles from './DropZone.module.scss';

type Props = {
  isOver?: boolean;
};

const DropZone: React.FC<Props> = ({ isOver }) => {
  return (
    <div className={cx(styles.dropZone, { [styles.dropZone_isOver]: isOver })}>
      <div className={styles.dropZone__content}></div>
      <IconImg />
      <div className={styles.dropZone__textWrap}>
        <p className={styles.dropZone__text1}>Перетащите сюда</p>
        <p className={styles.dropZone__text2}>любой элемент из левой панели</p>
      </div>
    </div>
  );
};

export default DropZone;

import React from 'react';
import cx from 'classnames';

import styles from './InsertPoint.module.scss';

type Props = {
  isLast?: boolean;
};

const InsertPoint: React.FC<Props> = ({ isLast }) => {
  return (
    <div className={cx(styles.insertPoint, { [styles.insertPoint_last]: isLast })}>
      <div className={styles.insertPoint__square}></div>
      <div className={styles.insertPoint__square}></div>
    </div>
  );
};

export default InsertPoint;

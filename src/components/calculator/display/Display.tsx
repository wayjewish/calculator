import React from 'react';

import styles from './Display.module.scss';

function Display() {
  return (
    <div className={styles.display}>
      <input className={styles.display__input} type="text" value="0" readOnly />
    </div>
  );
}

export default Display;

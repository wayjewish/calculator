import React from 'react';
import Mode from '../mode/Mode';
import List from '../left/list/List';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.container__top}>
          <Mode />
        </div>
        <div className={styles.container__body}>
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Mode from '../mode/Mode';
import List from '../left/list/List';

import styles from './App.module.scss';
import Board from '../board/Board';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.container__top}>
          <Mode />
        </div>
        <div className={styles.container__body}>
          <DndProvider backend={HTML5Backend}>
            <List />
            <Board />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default App;

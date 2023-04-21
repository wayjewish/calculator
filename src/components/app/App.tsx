import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import Mode from '../mode/Mode';
import Sidebar from '../sidebar/Sidebar';
import Board from '../board/Board';

import styles from './App.module.scss';
import DragLayer from '../ui/layer/DragLayer';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.container__top}>
          <Mode />
        </div>
        <div className={styles.container__body}>
          <DndProvider backend={TouchBackend} options={{ enableTouchEvents: false, enableMouseEvents: true }}>
            <DragLayer />
            <Sidebar />
            <Board />
          </DndProvider>
        </div>
        <div className={styles.container__body}>
          <DndProvider backend={HTML5Backend}>
            <Sidebar />
            <Board />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default App;

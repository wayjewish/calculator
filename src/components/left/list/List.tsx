import React from 'react';
import Card from '../../ui/card/Card';
import Display from '../../calculator/display/Display';
import Operations from '../../calculator/operations/Operations';
import Numbers from '../../calculator/numbers/Numbers';
import Equals from '../../calculator/equals/Equals';
import Drag from '../../dnd/drag/Drag';

import { CalcNamesItems, calcTypeItem } from '../../calculator/types';
import styles from './List.module.scss';

const List: React.FC = () => {
  return (
    <div className={styles.list}>
      <Drag type={calcTypeItem} name={CalcNamesItems.display}>
        <Card>
          <Display />
        </Card>
      </Drag>
      <Drag type={calcTypeItem} name={CalcNamesItems.operations}>
        <Card>
          <Operations />
        </Card>
      </Drag>
      <Drag type={calcTypeItem} name={CalcNamesItems.numbers}>
        <Card>
          <Numbers />
        </Card>
      </Drag>
      <Drag type={calcTypeItem} name={CalcNamesItems.equals}>
        <Card>
          <Equals />
        </Card>
      </Drag>
    </div>
  );
};

export default List;

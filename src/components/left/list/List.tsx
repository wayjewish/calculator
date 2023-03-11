import React from 'react';
import Card from '../../ui/card/Card';
import Display from '../../calculator/display/Display';
import Operations from '../../calculator/operations/Operations';
import Numbers from '../../calculator/numbers/Numbers';
import Equals from '../../calculator/equals/Equals';

import styles from './List.module.scss';

function List() {
  return (
    <div className={styles.list}>
      <Card>
        <Display />
      </Card>
      <Card>
        <Operations />
      </Card>
      <Card>
        <Numbers />
      </Card>
      <Card>
        <Equals />
      </Card>
    </div>
  );
}

export default List;

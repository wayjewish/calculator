import React from 'react';
import Button from '../../ui/buttons/default/Button';

import styles from './Operations.module.scss';

const Operations: React.FC = () => {
  return (
    <div className={styles.operations}>
      <Button>/</Button>
      <Button>х</Button>
      <Button>-</Button>
      <Button>+</Button>
    </div>
  );
};

export default Operations;

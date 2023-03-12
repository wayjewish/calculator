import React from 'react';
import Button from '../../ui/buttons/default/Button';

import styles from './Equals.module.scss';

const Equals: React.FC = () => {
  return (
    <div className={styles.equals}>
      <Button color="blue">=</Button>
    </div>
  );
};

export default Equals;

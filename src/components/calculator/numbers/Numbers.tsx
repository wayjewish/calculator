import React from 'react';
import Button from '../../ui/buttons/default/Button';

import styles from './Numbers.module.scss';

function Numbers() {
  return (
    <div className={styles.numbers}>
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>3</Button>
      <Button>2</Button>
      <Button>1</Button>
      <Button cols={2}>0</Button>
      <Button>,</Button>
    </div>
  );
}

export default Numbers;

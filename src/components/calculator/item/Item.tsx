import React from 'react';
import { CalcItemId } from '../types';

import Display from '../display/Display';
import Operations from '../operations/Operations';
import Numbers from '../numbers/Numbers';
import Equals from '../equals/Equals';

type Props = {
  id: CalcItemId;
};

const Item: React.FC<Props> = ({ id }) => {
  const renderCalculatorComponent = (id: CalcItemId) => {
    switch (id) {
      case CalcItemId.display:
        return <Display />;
      case CalcItemId.operations:
        return <Operations />;
      case CalcItemId.numbers:
        return <Numbers />;
      case CalcItemId.equals:
        return <Equals />;
    }
  };

  return <>{renderCalculatorComponent(id)}</>;
};

export default Item;

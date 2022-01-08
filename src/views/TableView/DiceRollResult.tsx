import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';

interface State {
  rolledValue: number;
}

const selector = (state: AppState): State => ({ rolledValue: state.diceRoll.rolledValue });

const DiceRollResult = (): JSX.Element | null => {
  const { rolledValue } = useSelector(selector);

  if (rolledValue < 1) {
    return null;
  } else {
    return <>{rolledValue}</>;
  }
};

export default DiceRollResult;

import { useDispatch, useSelector } from 'react-redux';
import { RandomTable } from 'src/model/RandomTable';
import { AppState } from 'src/store/model';
import { diceRollInProgressMutation } from 'src/store/mutations/diceRoll/DiceRollInProgressMutation';
import { diceRollResultMutation } from 'src/store/mutations/diceRoll/DiceRollResultMutation';
import { constructTableItems } from './model/tableConstructionService';

const INITIAL_ROLL_PAUSE = 20;
const MAX_ROLL_PAUSE = 700;
const RANDOM_PERIOD_MIN = 500;
const RANDOM_PERIOD_VARIABLE = 300;
const SLOW_DOWN_ITERS_MIN = 10;
const SLOW_DOWN_ITERS_VARIABLE = 5;

export type RollDiceService = (table: RandomTable) => void;
export type StopDiceRoll = () => void;

let cancelCallbacks: (() => void)[] = [];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

interface State {
  rollInProgress: boolean;
}

const selector = (state: AppState): State => ({
  rollInProgress: state.diceRoll.rollInProgress,
});

export const useRollDiceService = (): RollDiceService => {
  const { rollInProgress } = useSelector(selector);
  const dispatch = useDispatch();

  return (table: RandomTable) => {
    if (rollInProgress || table.items.length < 2) {
      return;
    }

    let continueRoll = true;
    const cancelCallback = () => continueRoll = false;
    cancelCallbacks.push(cancelCallback);
    const items = constructTableItems(table);
    dispatch(diceRollInProgressMutation(true));
    dispatch(diceRollResultMutation(1, items[0].id));
    const result = random(1, table.size + 1);
    const resultIndex: number = items
      .findIndex(({ rangeLow, rangeHigh }) => result >= rangeLow && result <= rangeHigh) ?? -1;
    const rollTransitionTime = Date.now() + RANDOM_PERIOD_MIN + random(0, RANDOM_PERIOD_VARIABLE);
    const slowDownSteps = SLOW_DOWN_ITERS_MIN + random(0, SLOW_DOWN_ITERS_VARIABLE);

    let currentItemIdx = 0;
    let stepOfSlowDown = 0;

    const incrementItemIdx = () => {
      currentItemIdx = (currentItemIdx + 1) % items.length;
      const item = items[currentItemIdx];
      const rollForItem = random(item.rangeLow, item.rangeHigh + 1);
      dispatch(diceRollResultMutation(rollForItem, item.id));
    };

    const stepSlowDown = () => {
      // If the roll was cancelled
      if (!continueRoll) {
        return;
      }
      
      stepOfSlowDown++;
      if (stepOfSlowDown === slowDownSteps) {
        dispatch(diceRollInProgressMutation(false));
        if (resultIndex >= 0) {
          dispatch(diceRollResultMutation(result, items[resultIndex].id));
        } else {
          dispatch(diceRollResultMutation(result, null));
        }
        cancelCallbacks = cancelCallbacks.filter((c) => c !== cancelCallback);
      } else {
        incrementItemIdx();
        // TODO this curve should probably be quadratic or similar, rather than linear
        // can be improved later
        setTimeout(stepSlowDown, MAX_ROLL_PAUSE * stepOfSlowDown / slowDownSteps);
      }
    };

    const alignToSlowDown = () => {
      // If the roll was cancelled
      if (!continueRoll) {
        return;
      }
      
      incrementItemIdx();
      if (resultIndex < 0 || (currentItemIdx + slowDownSteps) % items.length === resultIndex) {
        setTimeout(stepSlowDown, INITIAL_ROLL_PAUSE);
      } else {
        setTimeout(alignToSlowDown, INITIAL_ROLL_PAUSE);
      }
    };

    const stepRoll = () => {
      // If the roll was cancelled
      if (!continueRoll) {
        return;
      }

      incrementItemIdx();

      if (Date.now() >= rollTransitionTime) {
        setTimeout(alignToSlowDown, INITIAL_ROLL_PAUSE);
      } else {
        setTimeout(stepRoll, INITIAL_ROLL_PAUSE);
      }
    };

    setTimeout(stepRoll, INITIAL_ROLL_PAUSE);
  };
};

export const useStopDiceRoll = (): StopDiceRoll => {
  const dispatch = useDispatch();
  return () => {
    cancelCallbacks.forEach((c) => c());
    cancelCallbacks = [];
    dispatch(diceRollInProgressMutation(false));
    dispatch(diceRollResultMutation(0, null));
  };
};

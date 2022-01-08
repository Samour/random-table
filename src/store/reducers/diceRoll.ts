import { DiceRoll } from '../model/DiceRoll';
import { DiceRollInProgressMutation } from '../mutations/diceRoll/DiceRollInProgressMutation';
import { DiceRollResultMutation } from '../mutations/diceRoll/DiceRollResultMutation';
import { Mutation } from '../mutations/Mutation';
import { MutationType } from '../mutations/MutationType';

const initialState: DiceRoll = {
  rollInProgress: false,
  rolledValue: 0,
  rolledItemId: null,
};

export default (state: DiceRoll | undefined, mutation: Mutation): DiceRoll => {
  state = state ?? initialState;
  if (mutation.type === MutationType.DICE_ROLL_IN_PROGRESS) {
    const { inProgress: rollInProgress } = mutation as DiceRollInProgressMutation;
    return {
      ...state,
      rollInProgress,
    };
  } else if (mutation.type === MutationType.DICE_ROLL_RESULT) {
    const { rolledValue, rolledItemId } = mutation as DiceRollResultMutation;
    return {
      ...state,
      rolledValue,
      rolledItemId,
    };
  } else {
    return state;
  }
};

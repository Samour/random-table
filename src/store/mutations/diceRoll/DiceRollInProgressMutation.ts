import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface DiceRollInProgressMutation extends Mutation {
  type: MutationType.DICE_ROLL_IN_PROGRESS;
  inProgress: boolean;
}

export const diceRollInProgressMutation = (inProgress: boolean): DiceRollInProgressMutation => ({
  type: MutationType.DICE_ROLL_IN_PROGRESS,
  inProgress,
});

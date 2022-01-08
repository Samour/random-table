import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface DiceRollResultMutation extends Mutation {
  type: MutationType.DICE_ROLL_RESULT;
  rolledValue: number;
  rolledItemId: string | null;
}

export const diceRollResultMutation = (rolledValue: number, rolledItemId: string | null): DiceRollResultMutation => ({
  type: MutationType.DICE_ROLL_RESULT,
  rolledValue,
  rolledItemId,
});

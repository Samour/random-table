import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface ResetTableFormMutation extends Mutation {
  type: MutationType.RESET_TABLE_FORM;
}

export const resetTableFormMutation = (): ResetTableFormMutation => ({
  type: MutationType.RESET_TABLE_FORM,
});

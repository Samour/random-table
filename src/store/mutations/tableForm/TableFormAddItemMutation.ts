import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface TableFormAddItemMutation extends Mutation {
  type: MutationType.TABLE_FORM_ADD_ITEM;
}

export const tableFormAddItemMutation = (): TableFormAddItemMutation => ({
  type: MutationType.TABLE_FORM_ADD_ITEM,
});

import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormRemoveItemMutation extends Mutation {
  type: MutationType.TABLE_FORM_REMOVE_ITEM;
  itemId: string;
}

export const tableFormRemoveItemMutation = (itemId: string): TableFormRemoveItemMutation => ({
  type: MutationType.TABLE_FORM_REMOVE_ITEM,
  itemId,
});

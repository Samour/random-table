import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface TableFormUpdateItemNameMutation extends Mutation {
  type: MutationType.TABLE_FORM_UPDATE_ITEM_NAME;
  itemId: string;
  name: string;
}

export const tableFormUpdateItemNameMutation = (itemId: string, name: string): TableFormUpdateItemNameMutation => ({
  type: MutationType.TABLE_FORM_UPDATE_ITEM_NAME,
  itemId,
  name,
});

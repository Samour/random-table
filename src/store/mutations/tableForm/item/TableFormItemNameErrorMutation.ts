import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormItemNameErrorMutation extends Mutation {
  type: MutationType.TABLE_FORM_ITEM_NAME_ERROR;
  itemId: string;
  nameError: string;
}

export const tableFormItemNameErrorMutation = (itemId: string, nameError: string): TableFormItemNameErrorMutation => ({
  type: MutationType.TABLE_FORM_ITEM_NAME_ERROR,
  itemId,
  nameError,
});

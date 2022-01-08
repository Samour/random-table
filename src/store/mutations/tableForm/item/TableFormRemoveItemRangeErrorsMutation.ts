import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormRemoveItemRangeErrorsMutation extends Mutation {
  type: MutationType.TABLE_FORM_REMOVE_ITEM_RANGE_ERRORS;
}

export const tableFormRemoveItemRangeErrorsMutation = (): TableFormRemoveItemRangeErrorsMutation => ({
  type: MutationType.TABLE_FORM_REMOVE_ITEM_RANGE_ERRORS,
});

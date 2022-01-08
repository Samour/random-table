import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface TableFormItemRangeErrorMutation extends Mutation {
  type: MutationType.TABLE_FORM_ITEM_RANGE_ERROR;
  itemId: string;
  rangeLowError: boolean;
  rangeHighError: boolean;
}

export const tableFormItemRangeErrorMutation = (
  itemId: string,
  rangeLowError: boolean,
  rangeHighError: boolean,
): TableFormItemRangeErrorMutation => ({
  type: MutationType.TABLE_FORM_ITEM_RANGE_ERROR,
  itemId,
  rangeLowError,
  rangeHighError,
});

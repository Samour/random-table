import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormUpdateRangeLowMutation extends Mutation {
  type: MutationType.TABLE_FORM_UPDATE_RANGE_LOW;
  itemId: string;
  rangeLow: string;
}

export const tableFormUpdateRangeLowMutation = (itemId: string, rangeLow: string): TableFormUpdateRangeLowMutation => ({
  type: MutationType.TABLE_FORM_UPDATE_RANGE_LOW,
  itemId,
  rangeLow,
});

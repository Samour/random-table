import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface TableFormUpdateRangeHighMutation extends Mutation {
  type: MutationType.TABLE_FORM_UPDATE_RANGE_HIGH;
  itemId: string;
  rangeHigh: string;
}

export const tableFormUpdateRangeHighMutation = (
  itemId: string,
  rangeHigh: string,
): TableFormUpdateRangeHighMutation => ({
  type: MutationType.TABLE_FORM_UPDATE_RANGE_HIGH,
  itemId,
  rangeHigh,
});

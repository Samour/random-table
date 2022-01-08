import { RandomTable } from 'src/store/model/RandomTable';
import { MutationType } from '../MutationType';

export interface AddTableMutation {
  type: MutationType.ADD_TABLE;
  table: RandomTable;
}

export const addTableMutation = (table: RandomTable): AddTableMutation => ({
  type: MutationType.ADD_TABLE,
  table,
});

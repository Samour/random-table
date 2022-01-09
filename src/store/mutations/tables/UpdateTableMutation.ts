import { RandomTable } from 'src/model/RandomTable';
import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface UpdateTableMutation extends Mutation {
  type: MutationType.UPDATE_TABLE;
  table: RandomTable;
}

export const updateTableMutation = (table: RandomTable): UpdateTableMutation => ({
  type: MutationType.UPDATE_TABLE,
  table,
});

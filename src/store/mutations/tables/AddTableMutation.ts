import { RandomTable } from 'src/model/RandomTable';
import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface AddTableMutation extends Mutation {
  type: MutationType.ADD_TABLE;
  table: RandomTable;
}

export const addTableMutation = (table: RandomTable): AddTableMutation => ({
  type: MutationType.ADD_TABLE,
  table,
});

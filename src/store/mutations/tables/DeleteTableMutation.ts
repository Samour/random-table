import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface DeleteTableMutation extends Mutation {
  type: MutationType.DELETE_TABLE;
  tableId: string;
}

export const deleteTableMutation = (tableId: string): DeleteTableMutation => ({
  type: MutationType.DELETE_TABLE,
  tableId,
});

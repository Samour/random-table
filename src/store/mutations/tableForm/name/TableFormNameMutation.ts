import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormNameMutation extends Mutation {
  type: MutationType.TABLE_FORM_NAME_CHANGE;
  name: string;
}

export const tableFormNameMutation = (name: string): TableFormNameMutation => ({
  type: MutationType.TABLE_FORM_NAME_CHANGE,
  name,
});

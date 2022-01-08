import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface TableFormUpdateNameMutation extends Mutation {
  type: MutationType.TABLE_FORM_UPDATE_NAME;
  name: string;
}

export const tableFormUpdateNameMutation = (name: string): TableFormUpdateNameMutation => ({
  type: MutationType.TABLE_FORM_UPDATE_NAME,
  name,
});

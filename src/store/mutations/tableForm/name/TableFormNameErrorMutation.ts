import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormNameErrorMutation extends Mutation {
  type: MutationType.TABLE_FORM_NAME_ERROR;
  nameError: string;
}

export const tableFormNameErrorMutation = (nameError: string): TableFormNameErrorMutation => ({
  type: MutationType.TABLE_FORM_NAME_ERROR,
  nameError,
});

import { Mutation } from '../../Mutation';
import { MutationType } from '../../MutationType';

export interface TableFormConfirmationModalMutation extends Mutation {
  type: MutationType.TABLE_FORM_CONFIRMATION_MODAL;
  open: boolean;
  message?: string;
}

export const tableFormConfirmationModalMutation = (
  open: boolean,
  message?: string,
): TableFormConfirmationModalMutation => ({
  type: MutationType.TABLE_FORM_CONFIRMATION_MODAL,
  open,
  message,
});

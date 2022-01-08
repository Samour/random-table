import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface TableFormConfirmationModalMutation extends Mutation {
  type: MutationType.TABLE_FORM_CONFIRMATION_MODAL;
  confirmationModalOpen: boolean;
  confirmationModalMessage?: string;
}

export const tableFormConfirmationModalMutation = (
  confirmationModalOpen: boolean,
  confirmationModalMessage?: string,
): TableFormConfirmationModalMutation => ({
  type: MutationType.TABLE_FORM_CONFIRMATION_MODAL,
  confirmationModalOpen,
  confirmationModalMessage,
});

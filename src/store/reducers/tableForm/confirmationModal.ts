import { TableFormConfirmationModal } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { MutationType } from 'src/store/mutations/MutationType';
import { TableFormConfirmationModalMutation } from 'src/store/mutations/tableForm/confirmationModal/TableFormConfirmationModalMutation';

const initialState: TableFormConfirmationModal = {
  message: '',
  open: false,
};

export default (state: TableFormConfirmationModal | undefined, mutation: Mutation): TableFormConfirmationModal => {
  state = state ?? initialState;
  if (mutation.type === MutationType.RESET_TABLE_FORM) {
    return initialState;
  } else if (mutation.type === MutationType.TABLE_FORM_CONFIRMATION_MODAL) {
    const {
      open,
      message = state.message,
    } = mutation as TableFormConfirmationModalMutation;
    return {
      ...state,
      open,
      message,
    };
  } else {
    return state;
  }
};

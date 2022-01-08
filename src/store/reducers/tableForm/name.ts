import { TableFormName } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { MutationType } from 'src/store/mutations/MutationType';
import { TableFormNameErrorMutation } from 'src/store/mutations/tableForm/name/TableFormNameErrorMutation';
import { TableFormNameMutation } from 'src/store/mutations/tableForm/name/TableFormNameMutation';

const initialState: TableFormName = {
  name: '',
  error: '',
};

export default (state: TableFormName | undefined, mutation: Mutation): TableFormName => {
  state = state ?? initialState;
  if (mutation.type === MutationType.RESET_TABLE_FORM) {
    return initialState;
  } else if (mutation.type === MutationType.TABLE_FORM_NAME_CHANGE) {
    const { name } = mutation as TableFormNameMutation;
    return {
      ...state,
      name,
      error: '',
    };
  } else if (mutation.type === MutationType.TABLE_FORM_NAME_ERROR) {
    const { nameError } = mutation as TableFormNameErrorMutation;
    return {
      ...state,
      error: nameError,
    };
  } else {
    return state;
  }
};

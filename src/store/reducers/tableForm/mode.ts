import { TableFormMode } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { MutationType } from 'src/store/mutations/MutationType';

const initialState: TableFormMode = TableFormMode.CREATE;

export default (state: TableFormMode | undefined, mutation: Mutation): TableFormMode => {
  if (mutation.type === MutationType.RESET_TABLE_FORM) {
    return TableFormMode.CREATE;
  } else if (mutation.type === MutationType.FILL_TABLE_FORM) {
    return TableFormMode.EDIT;
  } else {
    return state ?? initialState;
  }
};

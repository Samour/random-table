import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';
import { TableFormItem, TableFormMode } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormConfirmationModalMutation } from 'src/store/mutations/tableForm/confirmationModal/TableFormConfirmationModalMutation';

interface State {
  mode: TableFormMode;
  items: TableFormItem[];
}

const selector = (state: AppState): State => ({
  mode: state.tableForm.mode,
  items: state.tableForm.items,
});

export const useValidateItemsPresent = () => {
  const { mode, items } = useSelector(selector);

  const warningMessage = () => {
    if (mode == TableFormMode.CREATE) {
      return 'You have not added any items to this table. Do you want to create it anyway?';
    } else {
      return 'You have not added any items to this table. Do you want to update it anyway?';
    }
  };

  return (): Mutation | null => {
    if (items.length === 0) {
      return tableFormConfirmationModalMutation(true, warningMessage());
    } else {
      return null;
    }
  };
};

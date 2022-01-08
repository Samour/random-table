import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';
import { TableFormItem } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormConfirmationModalMutation } from 'src/store/mutations/tableForm/confirmationModal/TableFormConfirmationModalMutation';

interface State {
  items: TableFormItem[];
}

const selector = (state: AppState): State => ({ items: state.tableForm.items });

export const useValidateItemsPresent = () => {
  const { items } = useSelector(selector);

  return (): Mutation | null => {
    if (items.length === 0) {
      return tableFormConfirmationModalMutation(
        true,
        'You have not added any items to this table. Do you want to create it anyway?',
      );
    } else {
      return null;
    }
  };
};

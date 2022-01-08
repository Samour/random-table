import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';
import { TableFormItem } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormItemNameErrorMutation } from 'src/store/mutations/tableForm/TableFormItemNameErrorMutation';

interface State {
  items: TableFormItem[];
}

const selector = (state: AppState): State => ({ items: state.tableForm.items });

export const useValidateItemNames = () => {
  const { items } = useSelector(selector);

  return (): Mutation[] => {
    return items.filter(({ name }) => !name.length)
      .map(({ id }) => tableFormItemNameErrorMutation(id, 'Item must have a name'));
  };
};

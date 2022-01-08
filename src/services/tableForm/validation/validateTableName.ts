import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormNameErrorMutation } from 'src/store/mutations/tableForm/name/TableFormNameErrorMutation';

interface State {
  name: string;
}

const selector = (state: AppState): State => ({ name: state.tableForm.name.name });

export const useValidateTableName = () => {
  const { name } = useSelector(selector);

  return (): Mutation[] => {
    if (name.length) {
      return [];
    } else {
      return [tableFormNameErrorMutation('Table must have a name')];
    }
  };
};

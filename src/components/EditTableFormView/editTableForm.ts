import { useDispatch, useSelector } from 'react-redux';
import { useCommitTableFormService } from 'src/services/tableForm/commitTableFormService';
import { tableFormAddItemMutation } from 'src/store/mutations/tableForm/item/TableFormAddItemMutation';
import { tableFormNameMutation } from 'src/store/mutations/tableForm/name/TableFormNameMutation';
import { useTableFormValidationService } from 'src/services/tableForm/validation/tableFormValidationService';
import { tableFormConfirmationModalMutation } from 'src/store/mutations/tableForm/confirmationModal/TableFormConfirmationModalMutation';
import { TableFormMode } from 'src/store/model/TableForm';
import { AppState } from 'src/store/model';
import { useNavigate, useParams } from 'react-router-dom';

interface State {
  mode: TableFormMode;
}

const selector = (state: AppState): State => ({
  mode: state.tableForm.mode,
});

export const useEditTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateTableFormService = useTableFormValidationService();
  const commitForm = useCommitTableFormService();
  const { tableId } = useParams();
  const { mode } = useSelector(selector);

  const cancelNavTarget = mode === TableFormMode.CREATE ? '/' : `/table/${tableId}`;
  const commitBtnText = mode === TableFormMode.CREATE ? 'Create' : 'Save';

  const setTableName = (name: string) => {
    dispatch(tableFormNameMutation(name));
  };

  const addTableItem = () => {
    dispatch(tableFormAddItemMutation());
  };

  const cancelForm = () => navigate(cancelNavTarget);

  const validateAndCommitForm = () => {
    if (validateTableFormService()) {
      commitForm();
    }
  };

  const closeConfirmationModal = () => {
    dispatch(tableFormConfirmationModalMutation(false));
  };

  return {
    commitBtnText,
    setTableName,
    addTableItem,
    cancelForm,
    validateAndCommitForm,
    closeConfirmationModal,
    commitForm,
  };
};

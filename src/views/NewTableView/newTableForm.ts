import { useEffect } from 'react';
import { useCreateTableService } from 'src/services/tableForm/createTableService';
import { useDispatch } from 'react-redux';
import { tableFormAddItemMutation } from 'src/store/mutations/tableForm/item/TableFormAddItemMutation';
import { tableFormNameMutation } from 'src/store/mutations/tableForm/name/TableFormNameMutation';
import { useTableFormValidationService } from 'src/services/tableForm/validation/tableFormValidationService';
import { tableFormConfirmationModalMutation } from 'src/store/mutations/tableForm/confirmationModal/TableFormConfirmationModalMutation';
import { resetTableFormMutation } from 'src/store/mutations/tableForm/ResetTableFormMutation';

export const useNewTableForm = () => {
  const dispatch = useDispatch();
  const validateTableFormService = useTableFormValidationService();
  const createTable = useCreateTableService();

  useEffect(() => () => { dispatch(resetTableFormMutation()) }, []);

  const setTableName = (name: string) => {
    dispatch(tableFormNameMutation(name));
  };

  const addTableItem = () => {
    dispatch(tableFormAddItemMutation());
  };

  const validateAndCreateTable = () => {
    if (validateTableFormService()) {
      createTable();
    }
  };

  const closeConfirmationModal = () => {
    dispatch(tableFormConfirmationModalMutation(false));
  };

  return {
    setTableName,
    addTableItem,
    validateAndCreateTable,
    closeConfirmationModal,
    createTable,
  };
};

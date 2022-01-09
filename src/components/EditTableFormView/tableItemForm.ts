import { useDispatch, useSelector } from 'react-redux';
import { validNumeric } from 'src/services/tableForm/validation/validNumeric';
import { AppState } from 'src/store/model';
import { TableFormItem } from 'src/store/model/TableForm';
import { tableFormRemoveItemMutation } from 'src/store/mutations/tableForm/item/TableFormRemoveItemMutation';
import { tableFormUpdateItemNameMutation } from 'src/store/mutations/tableForm/item/TableFormUpdateItemNameMutation';
import { tableFormUpdateRangeHighMutation } from 'src/store/mutations/tableForm/item/TableFormUpdateRangeHighMutation';
import { tableFormUpdateRangeLowMutation } from 'src/store/mutations/tableForm/item/TableFormUpdateRangeLowMutation';

const selector = (itemId: string) => (state: AppState): TableFormItem =>
  state.tableForm.items.find(({ id }) => id === itemId) as TableFormItem;

export const useTableItemForm = (itemId: string) => {
  const {
    name,
    nameError,
    rangeLow,
    rangeLowError,
    rangeHigh,
    rangeHighError,
  } = useSelector(selector(itemId));
  const dispatch = useDispatch();

  const setName = (name: string) => dispatch(tableFormUpdateItemNameMutation(itemId, name));

  const setRangeLow = (rangeLow: string) => {
    if (validNumeric(rangeLow)) {
      dispatch(tableFormUpdateRangeLowMutation(itemId, rangeLow));
    }
  };

  const setRangeHigh = (rangeHigh: string) => {
    if (validNumeric(rangeHigh)) {
      dispatch(tableFormUpdateRangeHighMutation(itemId, rangeHigh));
    }
  };

  const removeItem = () => dispatch(tableFormRemoveItemMutation(itemId));

  return {
    name,
    nameError,
    rangeLow,
    rangeLowError,
    rangeHigh,
    rangeHighError,
    setName,
    setRangeLow,
    setRangeHigh,
    removeItem,
  };
};

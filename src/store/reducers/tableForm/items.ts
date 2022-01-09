import { v4 as uuid } from 'uuid';
import { nextRangeVal } from 'src/services/tableForm/nextRangeValue';
import { TableFormItem } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { MutationType } from 'src/store/mutations/MutationType';
import { TableFormRemoveItemMutation } from 'src/store/mutations/tableForm/item/TableFormRemoveItemMutation';
import { TableFormUpdateItemNameMutation } from 'src/store/mutations/tableForm/item/TableFormUpdateItemNameMutation';
import { TableFormUpdateRangeLowMutation } from 'src/store/mutations/tableForm/item/TableFormUpdateRangeLowMutation';
import { TableFormUpdateRangeHighMutation } from 'src/store/mutations/tableForm/item/TableFormUpdateRangeHighMutation';
import { TableFormItemNameErrorMutation } from 'src/store/mutations/tableForm/item/TableFormItemNameErrorMutation';
import { TableFormItemRangeErrorMutation } from 'src/store/mutations/tableForm/item/TableFormItemRangeErrorMutation';
import { FillTableFormMutation } from 'src/store/mutations/tableForm/FillTableFormMutation';
import { updateListItem } from '../utils/updateListItem';

const updateTableItem = updateListItem<TableFormItem, string>(({ id }) => id);

const initialState: TableFormItem[] = [];

const createItem = (items: TableFormItem[]): TableFormItem => {
  const rangeVal = `${nextRangeVal(items)}`;
  return {
    id: uuid(),
    name: '',
    nameError: '',
    rangeLow: rangeVal,
    rangeLowError: false,
    rangeHigh: rangeVal,
    rangeHighError: false,
  };
};

export default (state: TableFormItem[] | undefined, mutation: Mutation): TableFormItem[] => {
  state = state ?? initialState;
  const updateItem = updateTableItem(state);

  if (mutation.type === MutationType.RESET_TABLE_FORM) {
    return initialState;
  } else if (mutation.type === MutationType.TABLE_FORM_ADD_ITEM) {
    return [
      ...state,
      createItem(state),
    ];
  } else if (mutation.type === MutationType.TABLE_FORM_REMOVE_ITEM) {
    const { itemId } = mutation as TableFormRemoveItemMutation;
    return state.filter(({ id }) => id !== itemId);
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_ITEM_NAME) {
    const { itemId, name } = mutation as TableFormUpdateItemNameMutation;
    return updateItem(itemId, {
      name,
      nameError: '',
    });
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_RANGE_LOW) {
    const { itemId, rangeLow } = mutation as TableFormUpdateRangeLowMutation;
    return updateItem(itemId, {
      rangeLow,
      rangeLowError: false,
    });
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_RANGE_HIGH) {
    const { itemId, rangeHigh } = mutation as TableFormUpdateRangeHighMutation;
    return updateItem(itemId, {
      rangeHigh,
      rangeHighError: false,
    });
  } else if (mutation.type === MutationType.TABLE_FORM_ITEM_NAME_ERROR) {
    const { itemId, nameError } = mutation as TableFormItemNameErrorMutation;
    return updateItem(itemId, { nameError });
  } else if (mutation.type === MutationType.TABLE_FORM_ITEM_RANGE_ERROR) {
    const { itemId, rangeLowError, rangeHighError } = mutation as TableFormItemRangeErrorMutation;
    return updateItem(itemId, { rangeLowError, rangeHighError });
  } else if (mutation.type === MutationType.TABLE_FORM_REMOVE_ITEM_RANGE_ERRORS) {
    return state.map((item) => ({
      ...item,
      rangeLowError: false,
      rangeHighError: false,
    }));
  } else if (mutation.type === MutationType.FILL_TABLE_FORM) {
    const { items } = mutation as FillTableFormMutation;
    return items.map(({ id, name, rangeLow, rangeHigh }) => ({
      id,
      name,
      nameError: '',
      rangeLow: `${rangeLow}`,
      rangeLowError: false,
      rangeHigh: `${rangeHigh}`,
      rangeHighError: false,
    }));
  } else {
    return state;
  }
};

import { nextRangeVal } from 'src/services/tableForm/nextRangeValue';
import { v4 as uuid } from 'uuid';
import { TableForm, TableFormItem } from '../model/TableForm';
import { Mutation } from '../mutations/Mutation';
import { MutationType } from '../mutations/MutationType';
import { TableFormConfirmationModalMutation } from '../mutations/tableForm/TableFormConfirmationModalMutation';
import { TableFormItemNameErrorMutation } from '../mutations/tableForm/TableFormItemNameErrorMutation';
import { TableFormItemRangeErrorMutation } from '../mutations/tableForm/TableFormItemRangeErrorMutation';
import { TableFormNameErrorMutation } from '../mutations/tableForm/TableFormNameErrorMutation';
import { TableFormRemoveItemMutation } from '../mutations/tableForm/TableFormRemoveItemMutation';
import { TableFormUpdateItemNameMutation } from '../mutations/tableForm/TableFormUpdateItemNameMutation';
import { TableFormUpdateNameMutation } from '../mutations/tableForm/TableFormUpdateName';
import { TableFormUpdateRangeHighMutation } from '../mutations/tableForm/TableFormUpdateRangeHighMutation';
import { TableFormUpdateRangeLowMutation } from '../mutations/tableForm/TableFormUpdateRangeLowMutation';
import { updateListItem } from './utils/updateListItem';

const updateTableItem = updateListItem<TableFormItem, string>(({ id }) => id);

const initialState: TableForm = {
  name: '',
  nameError: '',
  items: [],
  confirmationModalOpen: false,
  confirmationModalMessage: '',
};

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

export default (state: TableForm | undefined, mutation: Mutation): TableForm => {
  state = state ?? initialState;
  const updateItem = updateTableItem(state.items);

  if (mutation.type === MutationType.RESET_TABLE_FORM) {
    return initialState;
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_NAME) {
    const { name } = mutation as TableFormUpdateNameMutation;
    return {
      ...state,
      name,
      nameError: '',
    };
  } else if (mutation.type === MutationType.TABLE_FORM_ADD_ITEM) {
    return {
      ...state,
      items: [
        ...state.items,
        createItem(state.items),
      ],
    };
  } else if (mutation.type === MutationType.TABLE_FORM_REMOVE_ITEM) {
    const { itemId } = mutation as TableFormRemoveItemMutation;
    return {
      ...state,
      items: state.items.filter(({ id }) => id !== itemId),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_ITEM_NAME) {
    const { itemId, name } = mutation as TableFormUpdateItemNameMutation;
    return {
      ...state,
      items: updateItem(itemId, {
        name,
        nameError: '',
      }),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_RANGE_LOW) {
    const { itemId, rangeLow } = mutation as TableFormUpdateRangeLowMutation;
    return {
      ...state,
      items: updateItem(itemId, {
        rangeLow,
        rangeLowError: false,
      }),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_UPDATE_RANGE_HIGH) {
    const { itemId, rangeHigh } = mutation as TableFormUpdateRangeHighMutation;
    return {
      ...state,
      items: updateItem(itemId, {
        rangeHigh,
        rangeHighError: false,
      }),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_NAME_ERROR) {
    const { nameError } = mutation as TableFormNameErrorMutation;
    return {
      ...state,
      nameError,
    };
  } else if (mutation.type === MutationType.TABLE_FORM_ITEM_NAME_ERROR) {
    const { itemId, nameError } = mutation as TableFormItemNameErrorMutation;
    return {
      ...state,
      items: updateItem(itemId, { nameError }),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_ITEM_RANGE_ERROR) {
    const { itemId, rangeLowError, rangeHighError } = mutation as TableFormItemRangeErrorMutation;
    return {
      ...state,
      items: updateItem(itemId, { rangeLowError, rangeHighError }),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_REMOVE_ITEM_RANGE_ERRORS) {
    return {
      ...state,
      items: state.items.map((item) => ({
        ...item,
        rangeLowError: false,
        rangeHighError: false,
      })),
    };
  } else if (mutation.type === MutationType.TABLE_FORM_CONFIRMATION_MODAL) {
    const {
      confirmationModalOpen,
      confirmationModalMessage = state.confirmationModalMessage,
    } = mutation as TableFormConfirmationModalMutation;
    return {
      ...state,
      confirmationModalOpen,
      confirmationModalMessage,
    };
  } else {
    return state;
  }
};

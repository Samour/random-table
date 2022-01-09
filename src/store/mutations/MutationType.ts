export enum MutationType {
  RESET_TABLE_FORM = 'tableForm/reset',
  FILL_TABLE_FORM = 'tableForm/fill',

  TABLE_FORM_NAME_CHANGE = 'tableForm/name',
  TABLE_FORM_NAME_ERROR = 'tableForm/name/error',

  TABLE_FORM_ADD_ITEM = 'tableForm/item/add',
  TABLE_FORM_REMOVE_ITEM = 'tableForm/item/remove',
  TABLE_FORM_UPDATE_ITEM_NAME = 'tableForm/item/name',
  TABLE_FORM_UPDATE_RANGE_LOW = 'tableForm/item/rangeLow',
  TABLE_FORM_UPDATE_RANGE_HIGH = 'tableForm/item/rangeHigh',
  TABLE_FORM_ITEM_NAME_ERROR = 'tableForm/item/nameError',
  TABLE_FORM_ITEM_RANGE_ERROR = 'tableForm/item/rangeError',
  TABLE_FORM_REMOVE_ITEM_RANGE_ERRORS = 'tableForm/item/removeRangeErrors',

  TABLE_FORM_CONFIRMATION_MODAL = 'tableForm/confirmationModal',

  ADD_TABLE = 'tables/add',
  UPDATE_TABLE = 'tables/update',
  INITIALISE_TABLES = 'tables/initialise',
  DELETE_TABLE = 'tables/delete',

  DICE_ROLL_IN_PROGRESS = 'diceRoll/inProgress',
  DICE_ROLL_RESULT = 'diceRoll/result',
}

export enum MutationType {
  RESET_TABLE_FORM = 'tableForm/reset',
  TABLE_FORM_UPDATE_NAME = 'tableForm/name',
  TABLE_FORM_ADD_ITEM = 'tableForm/addItem',
  TABLE_FORM_REMOVE_ITEM = 'tableForm/removeItem',
  TABLE_FORM_UPDATE_ITEM_NAME = 'tableForm/updateItemName',
  TABLE_FORM_UPDATE_RANGE_LOW = 'tableForm/updateRangeLow',
  TABLE_FORM_UPDATE_RANGE_HIGH = 'tableForm/updateRangeHigh',
  TABLE_FORM_NAME_ERROR = 'tableForm/nameError',
  TABLE_FORM_ITEM_NAME_ERROR = 'tableForm/itemNameError',
  TABLE_FORM_ITEM_RANGE_ERROR = 'tableForm/itemRangeError',
  TABLE_FORM_REMOVE_ITEM_RANGE_ERRORS = 'tableForm/removeItemRangeErrors',
  TABLE_FORM_CONFIRMATION_MODAL = 'tableForm/confirmationModal',

  ADD_TABLE = 'tables/add',
  INITIALISE_TABLES = 'tables/initialise',
  DELETE_TABLE = 'tables/delete',

  DICE_ROLL_IN_PROGRESS = 'diceRoll/inProgress',
  DICE_ROLL_RESULT = 'diceRoll/result',
}

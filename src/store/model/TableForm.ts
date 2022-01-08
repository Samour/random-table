export interface TableFormName {
  name: string;
  error: string;
}

export interface TableFormItem {
  id: string;
  name: string;
  nameError: string;
  rangeLow: string;
  rangeLowError: boolean;
  rangeHigh: string;
  rangeHighError: boolean;
}

export interface TableFormConfirmationModal {
  open: boolean;
  message: string;
}

export interface TableForm {
  name: TableFormName;
  items: TableFormItem[];
  confirmationModal: TableFormConfirmationModal;
}

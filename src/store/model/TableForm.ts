export interface TableFormItem {
  id: string;
  name: string;
  nameError: string;
  rangeLow: string;
  rangeLowError: boolean;
  rangeHigh: string;
  rangeHighError: boolean;
}

export interface TableForm {
  name: string;
  nameError: string;
  items: TableFormItem[];
  confirmationModalOpen: boolean;
  confirmationModalMessage: string;
}

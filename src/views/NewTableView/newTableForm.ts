import { useState } from 'react';
import { useCreateTableService } from 'src/services/createTableService';
import { v4 as uuid } from 'uuid';
import { validateTableItems } from './validateTableItems';

const MIN_RANGE_VALUE = 1;
const MAX_RANGE_VALUE = 20; // Hardcoded, to become dynamic later

export interface FormTableItem {
  id: string;
  name: string;
  nameError: string;
  rangeLow: string;
  rangeLowError: boolean;
  rangeHigh: string;
  rangeHighError: boolean;
}

const validNumeric = (value: string): boolean => {
  if (value === '') {
    return true;
  }
  if (!/[0-9]*/.test(value)) {
    return false;
  }
  const intValue = Number.parseInt(value);
  if (intValue < MIN_RANGE_VALUE || intValue > MAX_RANGE_VALUE) {
    return false;
  }
  return true;
};

export const useNewTableForm = () => {
  const createTableService = useCreateTableService();
  const [tableName, setTableName] = useState('');
  const [tableNameError, setTableNameError] = useState('');
  const [tableItems, setTableItems] = useState<FormTableItem[]>([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmationModalMessage, setConfirmationModalMessage] = useState('');

  const nextRangeVal = () => {
    const values = tableItems.map(({ rangeHigh }) => rangeHigh)
      .filter((i) => !!i)
      .map((i) => Number.parseInt(i));
    if (!values.length) {
      return 1;
    }
    const itemsMax = Math.max(...values);
    if (itemsMax <= 0) {
      return 1;
    } else if (itemsMax >= 19) {
      return 20;
    } else {
      return itemsMax + 1;
    }
  };

  const addTableItem = () => {
    const rangeVal = `${nextRangeVal()}`;
    setTableItems([
      ...tableItems,
      {
        id: uuid(),
        name: '',
        nameError: '',
        rangeLow: rangeVal,
        rangeLowError: false,
        rangeHigh: rangeVal,
        rangeHighError: false,
      },
    ]);
  };

  const updateTableItem = (itemId: string, item: Partial<FormTableItem>) => setTableItems(
    tableItems.map((i) => i.id === itemId ? {
      ...i,
      ...item,
    } : i),
  );

  const tableItemListeners = (itemId: string) => ({
    onNameChange: (name: string) => updateTableItem(itemId, { name, nameError: '' }),
    onRangeLowChange: (rangeLow: string) => {
      if (validNumeric(rangeLow)) {
        updateTableItem(itemId, { rangeLow, rangeLowError: false });
      }
    },
    onRangeHighChange: (rangeHigh: string) => {
      if (validNumeric(rangeHigh)) {
        updateTableItem(itemId, { rangeHigh, rangeHighError: false });
      }
    },
    onRemove: () => setTableItems(tableItems.filter(({ id }) => id !== itemId)),
  });

  const createTable = () => {
    createTableService.createTable({
      id: uuid(),
      name: tableName,
      items: tableItems.map((i) => ({
        id: i.id,
        name: i.name,
        weight: Number.parseInt(i.rangeHigh) - Number.parseInt(i.rangeLow) + 1,
      })),
    });
  };

  const validateAndCreateTable = () => {
    let valid = true;
    if (!tableName) {
      setTableNameError('Table must have a name');
      valid = false;
    }
    if (tableItems.length) {
      const [tableItemErrors, allNumbersCovered] = validateTableItems(tableItems);
      if (tableItemErrors.size) {
        valid = false;
        setTableItems(
          tableItems.map((i) => ({
            ...i,
            ...(tableItemErrors.get(i.id) ?? {}),
          })),
        );
      } else {
        setTableItems(
          tableItems.map((i) => ({
            ...i,
            rangeLowError: false,
            rangeHighError: false,
          })),
        );
      }

      if (valid && !allNumbersCovered) {
        setConfirmationModalMessage('Not all die results are covered by this table. Do you want to create it anyway?');
        setConfirmationModalOpen(true);
        valid = false;
      }
    } else if (valid) {
      setConfirmationModalMessage('You have not added any items to this table. Do you want to create it anyway?');
      setConfirmationModalOpen(true);
      valid = false;
    }

    if (valid) {
      createTable();
    }
  };

  return {
    tableName,
    tableNameError,
    tableItems,
    confirmationModalOpen,
    confirmationModalMessage,
    setTableName: (name: string) => {
      setTableName(name);
      setTableNameError('')
    },
    addTableItem,
    tableItemListeners,
    createTable: validateAndCreateTable,
    closeConfirmationModal: () => setConfirmationModalOpen(false),
    confirmCreation: createTable,
  };
};

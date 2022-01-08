import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const MIN_RANGE_VALUE = 1;
const MAX_RANGE_VALUE = 20; // Hardcoded, to become dynamic later

export interface FormTableItem {
  id: string;
  name: string;
  rangeLow: string;
  rangeHigh: string;
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
  const [tableName, setTableName] = useState('');
  const [tableItems, setTableItems] = useState<FormTableItem[]>([]);

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
        rangeLow: rangeVal,
        rangeHigh: rangeVal,
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
    onNameChange: (name: string) => updateTableItem(itemId, { name }),
    onRangeLowChange: (rangeLow: string) => {
      if (validNumeric(rangeLow)) {
        updateTableItem(itemId, { rangeLow });
      }
    },
    onRangeHighChange: (rangeHigh: string) => {
      if (validNumeric(rangeHigh)) {
        updateTableItem(itemId, { rangeHigh });
      }
    },
    onRemove: () => setTableItems(tableItems.filter(({ id }) => id !== itemId)),
  });

  return {
    tableName,
    tableItems,
    setTableName,
    addTableItem,
    tableItemListeners,
  };
};

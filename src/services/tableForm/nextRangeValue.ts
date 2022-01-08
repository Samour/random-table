import { TableFormItem } from 'src/store/model/TableForm';

export const nextRangeVal = (items: TableFormItem[]) => {
  const values = items.map(({ rangeHigh }) => rangeHigh)
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

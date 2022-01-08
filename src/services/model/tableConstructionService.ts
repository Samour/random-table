import { ConstructedTableItem } from 'src/model/ConstructedTable';
import { RandomTable } from 'src/model/RandomTable';

const INITIAL_RANGE_LOW = 1;

export const constructTableItems = (table: RandomTable): ConstructedTableItem[] => {
  const constructed: ConstructedTableItem[] = [];
  for (let item of table.items) {
    let low = INITIAL_RANGE_LOW;
    if (constructed.length) {
      low = constructed[constructed.length - 1].rangeHigh + 1;
    }
    constructed.push({
      id: item.id,
      name: item.name,
      rangeLow: low,
      rangeHigh: low + item.weight - 1,
    });
  }

  return constructed;
};

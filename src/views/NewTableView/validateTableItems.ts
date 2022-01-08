const MIN_RANGE_VALUE = 1;
const MAX_RANGE_VALUE = 20; // Hardcoded, to become dynamic later

interface FormTableItem {
  id: string;
  name: string;
  rangeLow: string;
  rangeHigh: string;
}

interface ErrorResults {
  nameError?: string;
  rangeLowError: boolean;
  rangeHighError: boolean;
}

export const validateTableItems = (items: FormTableItem[]): [Map<string, ErrorResults>, boolean] => {
  const results: Map<string, ErrorResults> = new Map();

  const addError = (itemId: string, error: Partial<ErrorResults>) => {
    results.set(itemId, {
      ...(results.get(itemId) ?? { rangeLowError: false, rangeHighError: false }),
      ...error,
    });
  };

  items.forEach((item) => {
    if (!item.name) {
      addError(item.id, { nameError: 'Item must have a name' });
    }
    if (!item.rangeLow) {
      addError(item.id, { rangeLowError: true });
    }
    if (!item.rangeHigh) {
      addError(item.id, { rangeHighError: true });
    }
  });

  let ranges: [string, number, number][] = items
    .map(({ id, rangeLow, rangeHigh }): [string, number, number] =>
      [id, Number.parseInt(rangeLow), Number.parseInt(rangeHigh)]
    ).filter(([_, low, high]) => !!low && !!high);
  for (let range of ranges) {
    if (range[1] > range[2]) {
      addError(range[0], { rangeLowError: true, rangeHighError: true });
    }
  }
  ranges = ranges.filter(([_, low, high]) => low <= high);
  ranges.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      if (ranges[i][2] < ranges[j][1]) {
        break;
      }
      if (ranges[i][1] <= ranges[j][2] && ranges[i][2] >= ranges[j][1]) {
        addError(ranges[i][0], {
          rangeLowError: ranges[i][1] == ranges[j][1] || ranges[j][2] < ranges[i][2],
          rangeHighError: true,
        });
        addError(ranges[j][0], {
          rangeLowError: true,
          rangeHighError: ranges[j][2] <= ranges[i][2],
        });
      }
    }
  }

  let allNumbersCovered = ranges.length > 0;
  for (let i = 0; i < ranges.length; i++) {
    if (i === 0) {
      allNumbersCovered &&= ranges[i][1] === MIN_RANGE_VALUE;
    } else {
      allNumbersCovered &&= ranges[i][1] === ranges[i - 1][2] + 1;
    }
    if (i === ranges.length - 1) {
      allNumbersCovered &&= ranges[i][2] === MAX_RANGE_VALUE;
    }
  }

  return [results, allNumbersCovered];
};

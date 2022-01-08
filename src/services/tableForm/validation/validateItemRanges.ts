import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';
import { TableFormItem } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormItemRangeErrorMutation } from 'src/store/mutations/tableForm/item/TableFormItemRangeErrorMutation';

interface ErrorResults {
  rangeLowError: boolean;
  rangeHighError: boolean;
}

interface State {
  items: TableFormItem[];
}

const selector = (state: AppState): State => ({ items: state.tableForm.items });

export const useValidateItemRanges = () => {
  const { items } = useSelector(selector);

  return (): Mutation[] => {
    const errors: Map<string, ErrorResults> = new Map();

    const addError = (itemId: string, error: Partial<ErrorResults>) => {
      errors.set(itemId, {
        ...(errors.get(itemId) ?? { rangeLowError: false, rangeHighError: false }),
        ...error,
      });
    };

    for (let item of items) {
      if (!item.rangeLow) {
        addError(item.id, { rangeLowError: true });
      }
      if (!item.rangeHigh) {
        addError(item.id, { rangeHighError: true });
      }
    }

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

    const result = Array.from(errors.entries())
      .map(([itemId, { rangeLowError, rangeHighError }]) =>
        tableFormItemRangeErrorMutation(itemId, rangeLowError, rangeHighError)
      );

    return result;
  };
};

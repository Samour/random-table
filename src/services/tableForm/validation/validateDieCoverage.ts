import { useSelector } from 'react-redux';
import { AppState } from 'src/store/model';
import { TableFormItem, TableFormMode } from 'src/store/model/TableForm';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormConfirmationModalMutation } from 'src/store/mutations/tableForm/confirmationModal/TableFormConfirmationModalMutation';

const MIN_RANGE_VALUE = 1;
const MAX_RANGE_VALUE = 20; // Hardcoded, to become dynamic later

interface State {
  mode: TableFormMode;
  items: TableFormItem[];
}

const selector = (state: AppState): State => ({
  mode: state.tableForm.mode,
  items: state.tableForm.items,
});

export const useValidateDieCoverage = () => {
  const { mode, items } = useSelector(selector);

  const warningMessage = () => {
    if (mode == TableFormMode.CREATE) {
      return 'Not all die results are covered by this table. Do you want to create it anyway?';
    } else {
      return 'Not all die results are covered by this table. Do you want to update it anyway?';
    }
  };

  return (): Mutation | null => {
    const ranges: [string, number, number][] = items
      .map(({ id, rangeLow, rangeHigh }): [string, number, number] =>
        [id, Number.parseInt(rangeLow), Number.parseInt(rangeHigh)]
      ).filter(([_, low, high]) => !!low && !!high)
      .filter(([_, low, high]) => low <= high);
    ranges.sort((a, b) => a[1] - b[1]);

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

    if (allNumbersCovered) {
      return null;
    } else {
      return tableFormConfirmationModalMutation(true, warningMessage());
    }
  };
};

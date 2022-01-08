import { useDispatch } from 'react-redux';
import { Mutation } from 'src/store/mutations/Mutation';
import { tableFormRemoveItemRangeErrorsMutation } from 'src/store/mutations/tableForm/item/TableFormRemoveItemRangeErrorsMutation';
import { useValidateDieCoverage } from './validateDieCoverage';
import { useValidateItemNames } from './validateItemNames';
import { useValidateItemRanges } from './validateItemRanges';
import { useValidateItemsPresent } from './validateItemsPresent';
import { useValidateTableName } from './validateTableName';

export const useTableFormValidationService = () => {
  const dispatch = useDispatch();
  const errorMutationProducers: (() => Mutation[])[] = [
    useValidateTableName(),
    useValidateItemNames(),
    useValidateItemRanges(),
  ];
  const warningMutationProducers: (() => Mutation | null)[] = [
    useValidateItemsPresent(),
    useValidateDieCoverage(),
  ];

  return (): boolean => {
    dispatch(tableFormRemoveItemRangeErrorsMutation());
    const errorMutations = errorMutationProducers.map((producer) => producer())
      .flat();
    if (errorMutations.length) {
      errorMutations.forEach((m) => dispatch(m));
      return false;
    }

    for (let producer of warningMutationProducers) {
      let mutation = producer();
      if (mutation) {
        dispatch(mutation);
        return false;
      }
    }

    return true;
  };
};

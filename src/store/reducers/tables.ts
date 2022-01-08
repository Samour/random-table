import { RandomTable } from '../model/RandomTable';
import { Mutation } from '../mutations/Mutation';
import { MutationType } from '../mutations/MutationType';
import { AddTableMutation } from '../mutations/tables/AddTableMutaton';

export default (state: RandomTable[] | undefined, mutation: Mutation): RandomTable[] => {
  state = state ?? [];
  if (mutation.type === MutationType.ADD_TABLE) {
    const { table } = mutation as AddTableMutation;
    return [
      ...state,
      table,
    ];
  } else {
    return state;
  }
};

import { RandomTable } from 'src/model/RandomTable';
import { Mutation } from '../mutations/Mutation';
import { MutationType } from '../mutations/MutationType';
import { AddTableMutation } from '../mutations/tables/AddTableMutation';
import { DeleteTableMutation } from '../mutations/tables/DeleteTableMutation';
import { InitialiseTablesMutation } from '../mutations/tables/InitialiseTablesMutation';

export default (state: RandomTable[] | undefined, mutation: Mutation): RandomTable[] => {
  state = state ?? [];
  if (mutation.type === MutationType.ADD_TABLE) {
    const { table } = mutation as AddTableMutation;
    return [
      ...state,
      table,
    ];
  } else if (mutation.type === MutationType.INITIALISE_TABLES) {
    const { tables } = mutation as InitialiseTablesMutation;
    return tables;
  } else if (mutation.type === MutationType.DELETE_TABLE) {
    const { tableId } = mutation as DeleteTableMutation;
    return state.filter(({ id }) => id !== tableId);
  } else {
    return state;
  }
};

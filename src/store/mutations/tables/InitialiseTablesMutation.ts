import { RandomTable } from 'src/model/RandomTable';
import { Mutation } from '../Mutation';
import { MutationType } from '../MutationType';

export interface InitialiseTablesMutation extends Mutation {
  type: MutationType.INITIALISE_TABLES;
  tables: RandomTable[];
}

export const initialiseTablesMutation = (tables: RandomTable[]): InitialiseTablesMutation => ({
  type: MutationType.INITIALISE_TABLES,
  tables,
});

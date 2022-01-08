import { RandomTable } from 'src/model/RandomTable';
import { DiceRoll } from './DiceRoll';
import { TableForm } from './TableForm';

export interface AppState {
  tableForm: TableForm;
  tables: RandomTable[];
  diceRoll: DiceRoll;
}

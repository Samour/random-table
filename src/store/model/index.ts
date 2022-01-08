import { RandomTable } from 'src/model/RandomTable';
import { DiceRoll } from './DiceRoll';

export interface AppState {
  tables: RandomTable[];
  diceRoll: DiceRoll;
}

import { combineReducers } from 'redux';
import { AppState } from '../model';
import tables from './tables';
import diceRoll from './diceRoll';

export const reducer = combineReducers<AppState>({
  tables,
  diceRoll,
});

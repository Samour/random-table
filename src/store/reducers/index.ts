import { combineReducers } from 'redux';
import { AppState } from '../model';
import tableForm from './tableForm';
import tables from './tables';
import diceRoll from './diceRoll';

export const reducer = combineReducers<AppState>({
  tableForm,
  tables,
  diceRoll,
});

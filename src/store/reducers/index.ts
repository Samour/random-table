import { combineReducers } from 'redux';
import { AppState } from '../model';
import tables from './tables';

export const reducer = combineReducers<AppState>({
  tables,
});

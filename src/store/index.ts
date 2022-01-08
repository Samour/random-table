import { createStore, Store } from 'redux';
import { AppState } from './model';
import { reducer } from './reducers';

export const store: Store<AppState> = createStore(reducer);

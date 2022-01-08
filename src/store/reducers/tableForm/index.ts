import { combineReducers } from 'redux';
import { TableForm } from 'src/store/model/TableForm';
import name from './name';
import items from './items';
import confirmationModal from './confirmationModal';

export default combineReducers<TableForm>({
  name,
  items,
  confirmationModal,
});

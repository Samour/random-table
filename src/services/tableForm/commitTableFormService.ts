import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from 'src/store/model';
import { TableForm, TableFormMode } from 'src/store/model/TableForm';
import { addTableMutation } from 'src/store/mutations/tables/AddTableMutation';
import { RandomTable } from 'src/model/RandomTable';
import { updateTableMutation } from 'src/store/mutations/tables/UpdateTableMutation';

const selector = (state: AppState): TableForm => state.tableForm;

export const useCommitTableFormService = () => {
  const {
    mode,
    name: { name },
    items,
  } = useSelector(selector);
  const { tableId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTable = (table: RandomTable) => {
    dispatch(addTableMutation(table));
    navigate("/");
  };

  const updateTable = (table: RandomTable) => {
    dispatch(updateTableMutation(table));
    navigate(`/table/${table.id}`);
  };

  return () => {
    const sortedItems = items.map((i) => i);
    sortedItems.sort((a, b) => Number.parseInt(a.rangeLow) - Number.parseInt(b.rangeLow));
    const table = {
      id: uuid(),
      name,
      size: 20,
      items: sortedItems.map(({ id, name, rangeLow, rangeHigh }) => ({
        id,
        name,
        weight: Number.parseInt(rangeHigh) - Number.parseInt(rangeLow) + 1,
      })),
    };

    if (mode === TableFormMode.CREATE) {
      createTable(table);
    } else {
      updateTable({
        ...table,
        id: tableId!!,
      });
    }
  };
};

import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from 'src/store/model';
import { TableForm } from 'src/store/model/TableForm';
import { addTableMutation } from 'src/store/mutations/tables/AddTableMutation';

const selector = (state: AppState): TableForm => state.tableForm;

export const useCreateTableService = () => {
  const {
    name,
    items,
  } = useSelector(selector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    const sortedItems = items.map((i) => i);
    sortedItems.sort((a, b) => Number.parseInt(a.rangeLow) - Number.parseInt(b.rangeLow));
    dispatch(addTableMutation({
      id: uuid(),
      name,
      size: 20,
      items: sortedItems.map(({ id, name, rangeLow, rangeHigh }) => ({
        id,
        name,
        weight: Number.parseInt(rangeHigh) - Number.parseInt(rangeLow) + 1,
      })),
    }));
    navigate("/");
  };
};

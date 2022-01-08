import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTableMutation } from 'src/store/mutations/tables/AddTableMutation';

interface TableItemSpec {
  id: string;
  name: string;
  weight: number;
}

export interface CreateTableSpec {
  id: string;
  name: string;
  items: TableItemSpec[];
}

export type CreateTableService = (table: CreateTableSpec) => void;

export const useCreateTableService = (): CreateTableService => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (table: CreateTableSpec) => {
    dispatch(addTableMutation({
      ...table,
      size: 20,
    }));
    navigate("/");
  };
};

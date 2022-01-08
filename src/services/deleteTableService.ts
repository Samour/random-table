import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTableMutation } from 'src/store/mutations/tables/DeleteTableMutation';

export type DeleteTableService = (tableId: string) => void;

export const useDeleteTableService = (): DeleteTableService => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (tableId) => {
    dispatch(deleteTableMutation(tableId));
    navigate('/');
  };
};

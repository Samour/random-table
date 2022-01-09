import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditTableFormView from 'src/components/EditTableFormView';
import { RandomTable } from 'src/model/RandomTable';
import { AppState } from 'src/store/model';
import { fillTableFormMutation } from 'src/store/mutations/tableForm/FillTableFormMutation';

interface State {
  table: RandomTable;
}

const selector = (tableId: string) => (state: AppState): State => ({
  table: state.tables.find(({ id }) => id === tableId)!!,
});

const EditTableView = (): JSX.Element => {
  const dispatch = useDispatch();
  const { tableId } = useParams();
  const { table } = useSelector(selector(tableId!!));

  useEffect(() => { dispatch(fillTableFormMutation(table)) }, []);

  return <EditTableFormView />;
};

export default EditTableView;

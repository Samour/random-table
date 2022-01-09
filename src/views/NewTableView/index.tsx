import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EditTableFormView from 'src/components/EditTableFormView';
import { resetTableFormMutation } from 'src/store/mutations/tableForm/ResetTableFormMutation';

const NewTableView = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(resetTableFormMutation()) }, []);

  return <EditTableFormView />;
};

export default NewTableView;

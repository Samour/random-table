import React from 'react';
import { useParams } from 'react-router-dom';
import ConfirmationModal from 'src/components/ConfirmationModal';
import { useDeleteTableService } from 'src/services/deleteTableService';

interface Props {
  open: boolean;
  onClose: () => void;
}

const DeleteTableConfirm = ({ open, onClose }: Props): JSX.Element => {
  const { tableId = '' } = useParams();
  const deleteTableService = useDeleteTableService();
  const onDelete = () => deleteTableService(tableId);

  return (
    <ConfirmationModal
      open={open}
      message='Are you sure you want to delete this table?'
      confirmText='Delete'
      confirmColor='error'
      onClose={onClose}
      onConfirm={onDelete} />
  );
};

export default DeleteTableConfirm;

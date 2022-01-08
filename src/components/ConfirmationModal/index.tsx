import React from 'react';
import { Dialog, Grid } from '@mui/material';
import ConfirmCancelRow from 'src/components/ConfirmCancelRow';
import { ButtonColor } from 'src/types/mui';
import './index.css';

interface Props {
  open: boolean;
  message: string;
  confirmText?: string;
  confirmColor?: ButtonColor;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  open,
  message,
  confirmText,
  confirmColor,
  onClose,
  onConfirm,
}: Props): JSX.Element => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Grid container className='confirmation-modal' spacing={3}>
        <Grid item xs={12}>
          {message}
        </Grid>
        <Grid item xs={12}>
          <ConfirmCancelRow
            confirmText={confirmText}
            confirmColor={confirmColor}
            onConfirm={onConfirm}
            onCancel={onClose} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationModal;

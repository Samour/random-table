import React from 'react';
import { Button, Grid } from '@mui/material';

interface Props {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCancelRow = ({ confirmText, cancelText, onConfirm, onCancel }: Props): JSX.Element => (
  <Grid container>
    <Grid item xs={6}>
      <Button color="secondary" onClick={onCancel}>{cancelText ?? 'Cancel'}</Button>
    </Grid>
    <Grid item xs={6} display="flex" justifyContent="flex-end">
      <Button variant="contained" onClick={onConfirm}>{confirmText ?? 'Confirm'}</Button>
    </Grid>
  </Grid>
);

export default ConfirmCancelRow;

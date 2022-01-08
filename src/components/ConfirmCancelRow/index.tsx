import React from 'react';
import { Button, Grid } from '@mui/material';
import { ButtonColor } from 'src/types/mui';

interface Props {
  confirmText?: string;
  confirmColor?: ButtonColor;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCancelRow = ({
  confirmText,
  confirmColor,
  cancelText,
  onConfirm,
  onCancel,
}: Props): JSX.Element => (
  <Grid container>
    <Grid item xs={6}>
      <Button color="secondary" onClick={onCancel}>{cancelText ?? 'Cancel'}</Button>
    </Grid>
    <Grid item xs={6} display="flex" justifyContent="flex-end">
      <Button variant="contained" color={confirmColor} onClick={onConfirm}>{confirmText ?? 'Confirm'}</Button>
    </Grid>
  </Grid>
);

export default ConfirmCancelRow;

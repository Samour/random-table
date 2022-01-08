import React, { useState } from 'react';
import { Grid, Button, Popover } from '@mui/material';
import DeleteTableConfirm from './DeleteTableConfirm';
import './management-control.css';

const ManagementControl = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [deleteTableOpen, setDeleteTableOpen] = useState(false);

  const onClose = () => setAnchorEl(null);
  const onDeleteClick = () => {
    onClose();
    setDeleteTableOpen(true);
  };
  const onDeleteClose = () => setDeleteTableOpen(false);

  return (
    <Grid item xs={12} id="ManagementControl">
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>Manage</Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Grid container className="management-control drop-down-container">
          <Grid item xs={12}>
            <Button variant="contained" color="error" onClick={onDeleteClick}>Delete table</Button>
          </Grid>
        </Grid>
      </Popover>
      <DeleteTableConfirm open={deleteTableOpen} onClose={onDeleteClose} />
    </Grid>
  );
};

export default ManagementControl;

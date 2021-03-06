import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, Popover } from '@mui/material';
import DeleteTableConfirm from './DeleteTableConfirm';
import { useRollDiceService } from 'src/services/rollDiceService';
import { RandomTable } from 'src/model/RandomTable';
import { AppState } from 'src/store/model';
import './management-control.css';

interface Props {
  table: RandomTable;
}

interface State {
  rollInProgress: boolean;
}

const selector = (state: AppState): State => ({ rollInProgress: state.diceRoll.rollInProgress });

const ManagementControl = ({ table }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { rollInProgress } = useSelector(selector);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { tableId } = useParams();
  const [deleteTableOpen, setDeleteTableOpen] = useState(false);
  const rollDice = useRollDiceService();

  const onClose = () => setAnchorEl(null);
  const onRollClick = () => {
    onClose();
    rollDice(table);
  };
  const onEditClick = () => navigate(`/table/${tableId}/edit`);
  const onDeleteClick = () => {
    onClose();
    setDeleteTableOpen(true);
  };
  const onDeleteClose = () => setDeleteTableOpen(false);

  return (
    <Grid item xs={12} id="ManagementControl">
      <Button className='roll-button' disabled={rollInProgress} onClick={onRollClick}>Roll</Button>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>Manage</Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <div className="management-control drop-down-container">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button onClick={onEditClick}>Edit&nbsp;&nbsp;&nbsp;&nbsp;</Button>
            </Grid>
            <Grid item xs={12}>
              <Button color="error" onClick={onDeleteClick}>Delete table</Button>
            </Grid>
          </Grid>
        </div>
      </Popover>
      <DeleteTableConfirm open={deleteTableOpen} onClose={onDeleteClose} />
    </Grid>
  );
};

export default ManagementControl;

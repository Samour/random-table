import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container, Grid, TextField } from '@mui/material';
import Add from '@mui/icons-material/Add';
import ConfirmCancelRow from 'src/components/ConfirmCancelRow';
import ConfirmationModal from 'src/components/ConfirmationModal';
import { AppState } from 'src/store/model';
import { TableForm } from 'src/store/model/TableForm';
import { useNewTableForm } from './newTableForm';
import TableItem from './TableItem';

const selector = (state: AppState): TableForm => state.tableForm;

const NewTableView = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    name,
    nameError,
    items,
    confirmationModalOpen,
    confirmationModalMessage,
  } = useSelector(selector);

  const onCancelClick = () => navigate("/");

  const {
    setTableName,
    addTableItem,
    validateAndCreateTable,
    closeConfirmationModal,
    createTable,
  } = useNewTableForm();

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} className="text-center">
          <h1>New Table</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              Table name
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                variant="standard"
                value={name}
                error={!!nameError}
                helperText={nameError}
                onChange={(e) => setTableName(e.target.value)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              Dice Type
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              d20
            </Grid>
          </Grid>
        </Grid>
        {
          items.map(({ id }) => (
            <Grid item xs={12} key={id}>
              <TableItem id={id} />
            </Grid>
          ))
        }
        <Grid item xs={12}>
          <Button startIcon={<Add />} onClick={addTableItem}>Add item</Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <ConfirmCancelRow confirmText='Create' onCancel={onCancelClick} onConfirm={validateAndCreateTable} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationModal
        open={confirmationModalOpen}
        message={confirmationModalMessage}
        onClose={closeConfirmationModal}
        onConfirm={createTable} />
    </Container>
  );
};

export default NewTableView;

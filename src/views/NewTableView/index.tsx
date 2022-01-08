import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, TextField } from '@mui/material';
import ConfirmCancelRow from 'src/components/ConfirmCancelRow';
import Add from '@mui/icons-material/Add';
import { useNewTableForm } from './newTableForm';
import TableItem from './TableItem';
import ConfirmationModal from 'src/components/ConfirmationModal';

const NewTableView = (): JSX.Element => {
  const navigate = useNavigate();
  const onCancelClick = () => navigate("/");

  const {
    tableName,
    tableNameError,
    tableItems,
    confirmationModalOpen,
    confirmationModalMessage,
    setTableName,
    addTableItem,
    tableItemListeners,
    createTable,
    closeConfirmationModal,
    confirmCreation,
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
                value={tableName}
                error={!!tableNameError}
                helperText={tableNameError}
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
          tableItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <TableItem item={item} {...tableItemListeners(item.id)} />
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
              <ConfirmCancelRow confirmText='Create' onCancel={onCancelClick} onConfirm={createTable} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationModal
        open={confirmationModalOpen}
        message={confirmationModalMessage}
        onClose={closeConfirmationModal}
        onConfirm={confirmCreation} />
    </Container>
  );
};

export default NewTableView;

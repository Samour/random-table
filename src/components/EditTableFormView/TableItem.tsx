import React, { memo } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import { useTableItemForm } from './tableItemForm';

interface Props {
  id: string;
}

const TableItem = ({ id }: Props): JSX.Element => {
  const {
    name,
    nameError,
    rangeLow,
    rangeLowError,
    rangeHigh,
    rangeHighError,
    setName,
    setRangeLow,
    setRangeHigh,
    removeItem,
  } = useTableItemForm(id);

  return (
    <Grid container spacing={10}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          variant="standard"
          value={name}
          error={!!nameError}
          helperText={nameError}
          onChange={(e) => setName(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <TextField
          variant="outlined"
          size='small'
          value={rangeLow}
          error={rangeLowError}
          onChange={(e) => setRangeLow(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <TextField
          variant="outlined"
          size='small'
          value={rangeHigh}
          error={rangeHighError}
          onChange={(e) => setRangeHigh(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={removeItem}>
          <Clear />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default memo(TableItem);

import React, { memo } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import { FormTableItem } from './newTableForm';

interface Props {
  item: FormTableItem;
  onNameChange: (value: string) => void,
  onRangeLowChange: (value: string) => void,
  onRangeHighChange: (value: string) => void,
  onRemove: () => void,
}

const TableItem = ({
  item,
  onNameChange,
  onRangeLowChange,
  onRangeHighChange,
  onRemove,
}: Props): JSX.Element => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          variant="standard"
          value={item.name}
          error={!!item.nameError}
          helperText={item.nameError}
          onChange={(e) => onNameChange(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <TextField
          variant="outlined"
          size='small'
          value={item.rangeLow}
          error={item.rangeLowError}
          onChange={(e) => onRangeLowChange(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <TextField
          variant="outlined"
          size='small'
          value={item.rangeHigh}
          error={item.rangeHighError}
          onChange={(e) => onRangeHighChange(e.target.value)} />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={onRemove}>
          <Clear />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default memo(TableItem);

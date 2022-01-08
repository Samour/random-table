import React from 'react';
import { Grid } from '@mui/material';
import { ConstructedTableItem } from 'src/model/ConstructedTable';

interface Props {
  item: ConstructedTableItem;
}

const TableItem = ({ item }: Props): JSX.Element => {
  return (
    <Grid container spacing={10}>
      <Grid item xs={8}>
        {item.name}
      </Grid>
      <Grid item xs={2}>
        {item.rangeLow}
      </Grid>
      <Grid item xs={2}>
        {item.rangeHigh}
      </Grid>
    </Grid>
  );
};

export default TableItem;

import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { ConstructedTableItem } from 'src/model/ConstructedTable';
import { AppState } from 'src/store/model';
import './table-item.css';

interface Props {
  item: ConstructedTableItem;
}

interface State {
  isRolledItem: boolean;
}

const selector = (itemId: string) => (state: AppState): State => ({
  isRolledItem: state.diceRoll.rolledItemId === itemId,
});

const TableItem = ({ item }: Props): JSX.Element => {
  const { isRolledItem } = useSelector(selector(item.id));

  const className = ['table-item'];
  if (isRolledItem) {
    className.push('roll-active');
  }

  return (
    <div className={className.join(' ')}>
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
    </div>
  );
};

export default TableItem;

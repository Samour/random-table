import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';
import { RandomTable } from 'src/model/RandomTable';
import { AppState } from 'src/store/model';
import { constructTableItems } from 'src/services/model/tableConstructionService';
import { useStopDiceRoll } from 'src/services/rollDiceService';
import TableItem from './TableItem';
import ManagementControl from './ManagementControl';
import DiceRollResult from './DiceRollResult';
import './index.css';

const selector = (tableId: string) => (state: AppState): RandomTable =>
  state.tables.find(({ id }) => id === tableId) as RandomTable;

const TableView = (): JSX.Element => {
  const navigate = useNavigate();
  const stopDiceRoll = useStopDiceRoll();
  const { tableId = '' } = useParams();
  const table = useSelector(selector(tableId));
  const onBackClick = () => navigate("/");

  useEffect(() => stopDiceRoll, []);

  const constructedItems = constructTableItems(table);

  return (
    <Container maxWidth="md" id='TableView'>
      <Grid container spacing={2}>
        <Grid item xs={12} className="text-center">
          <h1>{table.name}</h1>
        </Grid>
        <ManagementControl table={table} />
        <Grid item xs={12}>
          <Grid container className="table-item">
            <Grid item xs={4}>
              Dice Type
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={2}>
              d{table.size}
            </Grid>
            <Grid item xs={2}>
              <DiceRollResult />
            </Grid>
          </Grid>
        </Grid>
        {
          constructedItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <TableItem item={item} />
            </Grid>
          ))
        }
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={11}>
              <Button color="secondary" onClick={onBackClick}>Back</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TableView;

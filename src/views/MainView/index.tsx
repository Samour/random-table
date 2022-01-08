import React from 'react';
import { Container, Grid } from '@mui/material';
import ListItem from './ListItem';
import { AppState } from 'src/store/model';
import { useSelector } from 'react-redux';

interface TableSummary {
  id: string;
  name: string;
}

const selector = (state: AppState): TableSummary[] => state.tables
  .map(({ id, name }) => ({ id, name }));

const MainView = (): JSX.Element => {
  const tables = useSelector(selector);

  return (
    <Container maxWidth="md" id="MainView">
      <Grid container spacing={3}>
        <Grid item xs={12} className='text-center'>
          <h1>My Tables</h1>
        </Grid>
        {
          tables.map((t) => (
            <Grid item xs={12} key={t.id}>
              <ListItem label={t.name} destination={`/table/${t.id}`} />
            </Grid>
          ))
        }
        <Grid item xs={12}>
          <ListItem label="New Table" destination="/new-table" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainView;

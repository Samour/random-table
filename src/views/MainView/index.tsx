import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { AppState } from 'src/store/model';
import { RandomTable } from 'src/model/RandomTable';
import ListItem from './ListItem';
import './index.css';

const selector = (state: AppState): RandomTable[] => state.tables;

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
          <ListItem label="New Table" destination="/new-table" className="new-table" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainView;

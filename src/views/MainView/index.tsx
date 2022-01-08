import React from 'react';
import { Container, Grid } from '@mui/material';
import NewTableButton from './NewTableButton';

const MainView = (): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} className='text-center'>
          <h1>My Tables</h1>
        </Grid>
        <Grid item xs={12}>
          <NewTableButton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainView;

import React from 'react';
import { Grid, Paper } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import './new-table-button.css';
import { useNavigate } from 'react-router-dom';

const NewTableButton = (): JSX.Element => {
  const navigate = useNavigate();
  const onClick = () => navigate("/new-table");

  return (
    <Paper elevation={1}>
      <Grid container id="NewTableButton" onClick={onClick}>
          <Grid item xs={10} className="item">
            New Table
          </Grid>
          <Grid item xs={2} textAlign="right" className="item icon">
            <ChevronRight />
          </Grid>
      </Grid>
    </Paper>
  );
};

export default NewTableButton;

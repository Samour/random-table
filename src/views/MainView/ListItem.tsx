import React from 'react';
import { Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronRight from '@mui/icons-material/ChevronRight';
import './list-item.css';

interface Props {
  label: string;
  destination: string;
};

const ListItem = ({ label, destination }: Props): JSX.Element => {
  const navigate = useNavigate();
  const onClick = () => navigate(destination);

  return (
    <Paper elevation={1}>
      <Grid container className="list-item" onClick={onClick}>
        <Grid item xs={10} className="item">
          {label}
        </Grid>
        <Grid item xs={2} textAlign="right" className="item icon">
          <ChevronRight />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ListItem;

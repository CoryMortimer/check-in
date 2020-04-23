import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '../ui/Grid';
import TitleBar from '../ui/NavBars/TitleBar';

const Login = () => (
  <TitleBar>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Login or Signup</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button href={`${process.env.REACT_APP_SERVER_DOMAIN}/session/authenticate`}>Start Here</Button>
      </Grid>
    </Grid>
  </TitleBar>
);

export default Login;

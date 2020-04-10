import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '../ui/Grid'

const Login = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h4">Login or Signup</Typography>
    </Grid>
    <Grid item xs={12} align="center">
      <Button href="http://localhost:3000/session/authenticate">Start Here</Button>
    </Grid>
  </Grid>
);

export default Login;

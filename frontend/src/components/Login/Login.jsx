import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
      <Grid item xs={12} align="center">
        <Typography variant="body">By using our service, you agree to our <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.</Typography>
      </Grid>
    </Grid>
  </TitleBar>
);

export default Login;

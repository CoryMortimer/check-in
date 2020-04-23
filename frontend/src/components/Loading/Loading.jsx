import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '../ui/Grid';
import TitleBar from '../ui/NavBars/TitleBar';

const useStyles = makeStyles(theme => ({
  spinner: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <TitleBar>
      <Grid container>
        <Grid item xs={12} className={classes.spinner}>
          <CircularProgress size={80} />
        </Grid>
      </Grid>
    </TitleBar>
  );
};

export default Loading;

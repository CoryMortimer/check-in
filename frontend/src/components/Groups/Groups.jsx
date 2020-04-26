import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import Grid from '../ui/Grid';
import GroupsList from './GroupsList';
import RequestForPostsList from './RequestForPostsList';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Groups = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Groups</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">You can now post an update for the following groups</Typography>
      </Grid>
      <Grid item xs={12}>
        <RequestForPostsList />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">You'll have to wait a bit to post an update for these groups</Typography>
      </Grid>
      <Grid item xs={12}>
        <GroupsList />
      </Grid>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => history.push('/groups/new')}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export default Groups;

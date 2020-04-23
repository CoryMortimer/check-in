import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const TitleBar = ({ children, iconButton }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {iconButton && iconButton}
          <Typography variant="h6">Check In</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <div className={classes.toolbar} />
        {children}
      </div>
    </>
  );
};

export default TitleBar;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import TitleBar from './TitleBar';


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const GroupsNavBar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <TitleBar
      iconButton={
        <IconButton
          className={classes.menuButton}
          color="inherit"
          edge="start"
          onClick={() => history.push('/groups')}
        >
          <ArrowBackIcon />
        </IconButton>
      }
    >
      {children}
    </TitleBar>
  );
};

export default GroupsNavBar;

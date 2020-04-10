import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const EditableMembersList = ({ members = [], removeItem }) => {
  const classes = useStyles();

  if (!members.length > 0) {
    return <Typography variant="body1">There are no members</Typography>
  }

  return (
    <List classes={classes}>
      {members.map((member, index) => (
        <ListItem key={index}>
          <ListItemText primary={member} />
          <IconButton onClick={() => removeItem(index)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default EditableMembersList;

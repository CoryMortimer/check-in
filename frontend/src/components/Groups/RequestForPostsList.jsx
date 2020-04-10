import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const RequestForPostsList = () => {
  const history = useHistory();
  const classes = useStyles();
  const { data: { data: groups } } = useSWR('/groups');
  const { data: { data: postRequests} = {} } = {} = useSWR('/request-for-posts');

  if (groups && postRequests) {
    const toDisplay = groups.filter((group) => postRequests.some((request) => group.id === request.group_id));

    return (
      <List classes={classes}>
        {toDisplay.map((group) => {
          return (
            <ListItem
              key={group.id}
              button
              onClick={() => history.push(`/groups/${group.id}`)}
            >
              <ListItemText primary={group.name} />
              <NavigateNextIcon />
            </ListItem>
          )
        })}
      </List>
    )
  }
  return null;
};

export default RequestForPostsList;

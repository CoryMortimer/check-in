import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const MembersList = ({ groupId }) => {
  const classes = useStyles();
  const { data: { data: members = [] } = {} } = {} = useSWR(`/groups/${groupId}/users`);

  if (!members.length > 0) {
    return <Typography variant="body1">There are no members</Typography>
  }

  return (
    <List classes={classes}>
      {members.map((member, index) => (
        <ListItem key={member.id}>
          <ListItemText primary={member.email} />
        </ListItem>
      ))}
    </List>
  );
};

export default MembersList;

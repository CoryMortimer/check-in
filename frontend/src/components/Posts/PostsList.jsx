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

const PostsList = ({ groupId }) => {
  const classes = useStyles();
  const { data: { data: posts = [] } = {} } = {} = useSWR(`/posts/?groupId=${groupId}`);

  if (!posts.length > 0) {
    return <Typography variant="body1">There are no posts</Typography>
  }

  return (
    <List classes={classes}>
      {posts.map((post) => (
        <ListItem key={post.id}>
          <ListItemText
            primary={post.email}
            secondary={post.message}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PostsList;

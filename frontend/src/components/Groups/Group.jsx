import React from 'react'
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '../ui/Grid';
import MembersList from '../Members/MembersList';
import PostsList from '../Posts/PostsList';
import CreatePost from '../Posts/CreatePost';
import axios from 'axios';
import useSWR from 'swr';

const Group = () => {
  const { groupId } = useParams();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Group</Typography>
      </Grid>
      <Grid item xs={12}>
        <CreatePost groupId={groupId} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Members</Typography>
      </Grid>
      <Grid item xs={12}>
        <MembersList groupId={groupId} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Posts</Typography>
      </Grid>
      <Grid item xs={12}>
        <PostsList groupId={groupId} />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => axios.delete(`/groups/${groupId}`)}
          >
            Delete Group
          </Button>
      </Grid>
    </Grid>
  );
};

export default Group;

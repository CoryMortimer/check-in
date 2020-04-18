import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '../ui/Grid';
import httpRequest from '../../utils/httpRequest';
import useSWR from 'swr';

const CreatePost = ({ groupId }) => {
  const [post, setPost] = useState('');
  const { data: { data: requestForPost } = {} } = {} = useSWR(`/request-for-posts/?groupId=${groupId}`);
  const { data: { data: userPost } = {} } = {} = useSWR(() => `/request-for-posts/${requestForPost.id}/post`);

  useEffect(() => {
    if (!post && userPost && userPost.message) {
      setPost(userPost.message);
    }
  }, [userPost, post]);

  const openTime = requestForPost ? new Date(requestForPost.time_open) : null;
  const closeTime = requestForPost ? new Date(requestForPost.time_close) : null;
  const now = new Date();
  const isPostingOpen = openTime <= now && now <= closeTime;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const requestMethod = userPost.message !== undefined ? httpRequest.put : httpRequest.post;
        requestMethod(`/request-for-posts/${requestForPost.id}/post`, {message: event.target.post.value});
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {requestForPost && (
            <>
              <Typography variant="h6">Posting is {isPostingOpen ? 'open' : 'closed' }</Typography>
              <Typography variant="body1">{openTime.toString()} to {closeTime.toString()}</Typography>
            </>
          )}
        </Grid>
        {isPostingOpen && (
          <>
            <Grid item xs={12}>
              <TextField
                value={post}
                onChange={(event) => setPost(event.target.value)}
                fullWidth
                label="Post"
                placeholder="What is happening in your life?"
                multiline
                variant="outlined"
                name="post"
              />
            </Grid>
            <Grid item xs={12} align="right">
              <Button type="submit" color="primary" variant="contained">Submit</Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export default CreatePost;

import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Grid from '../ui/Grid';
import EditableMembersList from '../Members/EditableMembersList';
import httpRequest from '../../utils/httpRequest';

const NewGroup = () => {
  const [groupName, setGroupName] = useState('My New Group');
  const [members, setMembers] = useState([]);
  const [emailField, setEmailField] = useState('');
  const history = useHistory();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">New Group</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          placeholder="Enter the name for the group"
          variant="outlined"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <EditableMembersList
          members={members}
          removeItem={(index) => {
            const copied = [...members];
            copied.splice(index, 1);
            setMembers(copied);
          }}
        />
      </Grid>
      <form style={{width: '100%'}} onSubmit={(event) => {
        event.preventDefault();
        if (emailField) {
          setMembers([...members, emailField]);
          setEmailField('');
        }
      }}>
        <Grid item xs={12}>
          <TextField
            value={emailField}
            onChange={(event) => setEmailField(event.target.value)}
            fullWidth
            label="Member email"
            placeholder="Enter email to add member"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} align="right">
          <Button align="right" type="submit" color="primary">Add</Button>
        </Grid>
      </form>
      <Grid item xs={12}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            httpRequest.post('/groups', { name: groupName, members })
              .then(() => history.push('/groups'));
          }}
        >
          Create Group
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewGroup;

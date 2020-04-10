const express = require('express');
const router = express.Router();
const {
  createGroup,
  getGroups,
  getGroup,
  addUserToGroup,
  archiveGroup,
  createGroupWithUsersAndRequest
} = require('../resources/Groups');
const { createUser, getUsersByGroupId } = require('../resources/Users');
const handleRejection = require('../middleware/handleRejection');

router.get('/', handleRejection((req, res) => {
  return getGroups({ userId: req.authenticatedUser.id })
    .then((groups) => {
      res.status(200);
      res.json({data: groups});
    });
}));

router.post('/', handleRejection((req, res) => {
  const groupName = req.body.name;
  const groupMembers = req.body.members;
  if (groupName && groupMembers && Array.isArray(groupMembers)) {
    return createGroupWithUsersAndRequest({ name: req.body.name, emails: groupMembers, userId: req.authenticatedUser.id })
      .then(() => {
        res.status(201);
        res.json({});
      });
  } else {
    res.status(422);
    res.json({error: 'name and groupMembers are required'});
  }
}));

router.post('/:groupId/users', handleRejection((req, res) => {
  const email = req.body.email;
  if (email) {
    return createUser({ email })
      .then((user) => addUserToGroup({ groupId: req.params.groupId, userId: user.id}))
      .then(() => res.status(201));
  } else {
    res.status(422);
    res.json({error: 'email is required'});
  }
}));

router.get('/:groupId/users', handleRejection((req, res) => {
  return getGroup({ groupId: req.params.groupId, userId: req.authenticatedUser.id})
    .then((group) => {
      if (group) {
        return getUsersByGroupId({ groupId: group.id })
          .then((users) => {
            res.status(200);
            res.json({data: users});
          })
      } else {
        res.status(404);
        return res.json({error: 'group is not found'});
      }
    });
}));

router.get('/:groupId', handleRejection((req, res) => {
  return getGroup({ groupId: req.params.groupId, userId: req.authenticatedUser.id })
    .then((group) => {
      res.status(200);
      res.json({data: group});
    });
}));

router.delete('/:groupId', handleRejection((req, res) => {
  return archiveGroup({ groupId: req.params.groupId, userId: req.authenticatedUser.id })
    .then(() => {
      res.status(200);
      res.json({});
    });
}));

module.exports = router;

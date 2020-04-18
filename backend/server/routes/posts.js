const express = require('express');
const router = express.Router();
const { getGroup, getGroupPosts } = require('../resources/Groups');
const handleRejection = require('../middleware/handleRejection');

router.get('/', handleRejection((req, res) => {
  const groupId = req.query.groupId;
  if (!groupId) {
    res.status(422);
    return res.json({error: 'groupId is required'});
  }
  return getGroup({ userId: req.authenticatedUser.id, groupId })
    .then((group) => {
      if (!group) {
        res.status(404);
        return res.json({error: 'group not found'});
      }
      return getGroupPosts({groupId})
        .then((posts) => {
          res.status(200);
          return res.json({data: posts});
        });
    });
}));

module.exports = router;

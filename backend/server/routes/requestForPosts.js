const express = require('express');
const router = express.Router();
const {
  createRequestForPost,
  getOpenRequestForPost,
  getRequestForPosts,
  getRequestForPostById
} = require('../resources/RequestForPosts');
const { createPost, updatePost, getPost } = require('../resources/Posts');
const handleRejection = require('../middleware/handleRejection');

router.get('/', handleRejection((req, res) => {
  const groupId = req.query.groupId;
  if (groupId) {
    return getOpenRequestForPost({ groupId, userId: req.authenticatedUser.id })
      .then((requestForPost) => {
        res.status(200);
        res.json({data: requestForPost});
      });
  } else {
    return getRequestForPosts({ userId: req.authenticatedUser.id })
      .then((requestForPosts) => {
        res.status(200);
        res.json({data: requestForPosts});
      });
  }
}));

router.post('/', handleRejection((req, res) => {
  const groupId = req.body.groupId;
  if (groupId) {
    return getOpenRequestForPost({ groupId, userId: req.authenticatedUser.id })
      .then((requestForPost) => {
        if (requestForPost) {
          res.status(422);
          res.json({error: 'a request is already open'});
        } else {
          const now = new Date();
          const fiveDaysFromNow = new Date();
          fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
          return createRequestForPost({ groupId, timeOpen: now, timeClose: fiveDaysFromNow })
        }
      })
  } else {
    res.status(422);
    res.json({error: 'groupId is required'});
  }
}));

router.get('/:requestForPostId/post', handleRejection((req, res) => {
  const requestForPostId = req.params.requestForPostId;
  return getPost({ userId: req.authenticatedUser.id, requestForPostId })
    .then((post) => {
      res.status(200);
      res.json({data: post || {}});
    });
}));

router.post('/:requestForPostId/post', handleRejection((req, res) => {
  const requestForPostId = req.params.requestForPostId;
  const message = req.body.message;
  if (message) {
    return getRequestForPostById({ requestForPostId })
      .then((requestForPost) => {
        if (!requestForPost) {
          res.status(422);
          res.json({error: 'a request is not open'});
        } else {
          return createPost({ message, requestForPostId, userId: req.authenticatedUser.id })
            .then((post) => {
              res.status(201);
              res.json({data: post});
            });
        }
      })
  } else {
    res.status(422);
    res.json({error: 'message is required'});
  }
}));

router.put('/:requestForPostId/post', handleRejection((req, res) => {
  const requestForPostId = req.params.requestForPostId;
  const message = req.body.message;
  if (message) {
    return getRequestForPostById({ requestForPostId })
      .then((requestForPost) => {
        if (!requestForPost) {
          res.status(422);
          res.json({error: 'a request is not open'});
        } else {
          updatePost({ message, requestForPostId, userId: req.authenticatedUser.id })
            .then((post) => {
              res.status(200);
              res.json({data: post});
            });
        }
      })
  } else {
    res.status(422);
    res.json({error: 'message is required'});
  }
}));

module.exports = router;

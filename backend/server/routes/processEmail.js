const express = require('express');
const router = express.Router();
const handleRejection = require('../middleware/handleRejection');
const { getUserByEmail } = require('../resources/Users');
const { getOpenRequestForPost } = require('../resources/RequestForPosts');
const { getPost, createPost, updatePost } = require('../resources/Posts');

router.post('/', handleRejection((req, res) => {
  const { text, envelope } = req.body;
  const { from, to } = JSON.parse(envelope);
  return getUserByEmail({ email: from })
    .then((user) => {
      if (user) {
        const groupId = to[0].split('@')[0];
        return getOpenRequestForPost({ groupId, userId: user.id })
          .then((requestForPost) => {
            if (requestForPost) {
              const userId = user.id;
              const requestForPostId = requestForPost.id;
              return getPost({ userId, requestForPostId })
                .then((post) => {
                  if (post) {
                    return updatePost({ message: text, requestForPostId, userId });
                  } else {
                    return createPost({ message: text, requestForPostId, userId });
                  }
                });
            }
          });
      }
    })
    .catch(() => null)
    .finally(() => {
      res.status(200);
      return res.json({});
    });
}));

module.exports = router;

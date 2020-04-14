const express = require('express');
const router = express.Router();
const handleRejection = require('../middleware/handleRejection');
const { addStatus } = require('../resources/SentEmail');

router.post('/', handleRejection((req, res) => {
  console.log('req.body', JSON.stringify(req.body));
  const updates = req.body;
  const promises = updates.map((update) => {
    const { email, event: status, userId, requestForPostId } = update;
    return addStatus({ email, requestForPostId, userId, status });
  });

  return Promise.all(promises)
    .finally(() => {
      res.status(200);
      return res.json({});
    });
}));

module.exports = router;

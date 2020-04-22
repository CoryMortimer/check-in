const express = require('express');
const router = express.Router();
const handleRejection = require('../middleware/handleRejection');
const sendCheckIn = require('../job');

router.post('/send-check-in', handleRejection((req, res) => {
  res.status(200);
  res.json({});
  return sendCheckIn();
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const handleRejection = require('../middleware/handleRejection');
const sendCheckIn = require('../job');
const sendNewsletter = require('../newsletter');

router.post('/send-check-in', handleRejection((req, res) => {
  res.status(200);
  res.json({});
  return sendCheckIn();
}));

router.post('/send-newsletter', handleRejection((req, res) => {
  res.status(200);
  res.json({});
  return sendNewsletter();
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const Users = require('../resources/Users');
const handleRejection = require('../middleware/handleRejection');

router.get('/', handleRejection((req, res) => {
  res.status(200);
  return Users.getUsers()
    .then(results => res.json({status: 'get users', results }));
}));

module.exports = router;

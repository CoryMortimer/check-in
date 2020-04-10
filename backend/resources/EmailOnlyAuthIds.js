const pool = require('../db');

const createAuth = ({userId, authId}) => {
  return pool.query(
    'INSERT INTO email_only_auth_ids(user_id, auth_id) values ($1, $2) ON CONFLICT (user_id) DO NOTHING',
    [userId, authId]
  ).then((results) => results.rows[0]);
};

module.exports = { createAuth };

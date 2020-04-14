const pool = require('../db');

const addStatus = ({ email, requestForPostId, userId, status }) => {
  return pool.query(
    'INSERT INTO sent_emails(status, email, user_id, request_for_post_id) values ($1, $2, $3, $4) RETURNING *',
    [status, email, userId, requestForPostId]
  ).then((results) => results.rows[0]);
};

module.exports = { addStatus };

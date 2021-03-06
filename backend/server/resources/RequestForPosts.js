const pool = require('../db');

const getRequestForPosts = ({ userId }) => {
  return pool.query('select r.group_id, r.time_open, r.time_close from request_for_posts as r inner join users_groups as ug on r.group_id = ug.group_id where r.time_open <= now() and r.time_close >= now() and ug.user_id=$1', [userId])
    .then((results) => results.rows);
};

const createRequestForPost = ({ groupId, timeOpen, timeClose }) => {
  return pool.query('INSERT INTO request_for_posts(groupId, time_open, time_close) values ($1, $2, $3) RETURNING *', [groupId, timeOpen, timeClose])
    .then((results) => results.rows[0]);
};

const getOpenRequestForPost = ({ groupId, userId }) => {
  return pool.query(
    'select r.id, r.group_id, r.time_open, r.time_close, r.sent_newsletter, r.archived, r.created_at from request_for_posts as r inner join users_groups as ug on r.group_id=ug.group_id where r.time_open <= now() and r.time_close >= now() and r.group_id=$1 and ug.user_id=$2',
    [groupId, userId]
  )
    .then((results) => results.rows[0]);
};

const getRequestForPostById = ({ requestForPostId }) => {
  return pool.query('select * from request_for_posts as r where r.time_open <= now() and r.time_close >= now() and r.id=$1', [requestForPostId])
    .then((results) => results.rows[0]);
};

module.exports = {
  createRequestForPost,
  getRequestForPosts,
  getOpenRequestForPost,
  getRequestForPostById
};

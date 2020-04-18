const pool = require('../db');

const getPost = ({ userId, requestForPostId }) => {
  return pool.query(
    'select p.id, p.message from posts as p inner join request_for_posts as r on r.id=p.request_for_post_id where r.id=$1 and p.user_id=$2 and p.archived=FALSE and r.archived=FALSE',
    [requestForPostId, userId]
  )
    .then((results) => results.rows[0]);
};

const createPost = ({ message, requestForPostId, userId }) => {
  return pool.query(
    'INSERT INTO posts(message, request_for_post_id, user_id) values ($1, $2, $3) RETURNING *',
    [message, requestForPostId, userId]
  )
    .then((results) => results.rows[0]);
};

const updatePost = ({ message, requestForPostId, userId }) => {
  return pool.query(
    'UPDATE posts SET message = $1 WHERE request_for_post_id=$2 AND user_id=$3 RETURNING *',
    [message, requestForPostId, userId]
  )
    .then((results) => results.rows[0]);
};

module.exports = { createPost, updatePost, getPost };

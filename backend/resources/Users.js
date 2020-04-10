const pool = require('../db');

const getUsers = () => {
  return pool.query('SELECT * FROM users').then((results) => results.rows);
};

const getUsersByGroupId = ({ groupId }) => {
  return pool.query(
    'select u.id, u.name, u.phone, u.email from users as u inner join users_groups as ug on u.id=ug.user_id where ug.group_id=$1 and ug.archived=FALSE and u.archived=FALSE',
    [groupId]
  ).then((results) => results.rows);
};

const getUserByEmail = ({ email }) => {
  return pool.query('SELECT * FROM users WHERE email=$1', [email]).then((results) => results.rows[0]);
};

const getUserByAuthId = ({ userAuthId }) => {
  return pool.query(
    'select u.id, u.email, u.name, u.phone from users as u inner join email_only_auth_ids as e on u.id=e.user_id where e.auth_id=$1 and u.archived=$2',
    [userAuthId, false]
  ).then((results) => results.rows[0]);
};

const createUser = ({ name, email, phone }) => {
  return pool.query(
    'INSERT INTO users(name, email, phone) values ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
    [name, email, phone]
  ).then((results) => results.rows[0]);
};

module.exports = { getUsers, createUser, getUserByEmail, getUserByAuthId, getUsersByGroupId };

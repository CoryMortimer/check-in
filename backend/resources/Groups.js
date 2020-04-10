const pool = require('../db');

const getGroups = ({ userId }) => {
  return pool.query('select g.id, g.name, g.archived from groups as g inner join users_groups as ug on g.id=ug.group_id where ug.user_id=$1 and g.archived=FALSE', [userId])
    .then((results) => results.rows);
};

const getGroup = ({ userId, groupId }) => {
  return pool.query('select g.id, g.name, g.archived from groups as g inner join users_groups as ug on g.id=ug.group_id where ug.user_id=$1 and g.archived=FALSE and g.id=$2', [userId, groupId])
    .then((results) => results.rows[0]);
};

const archiveGroup = ({ userId, groupId }) => {
  return pool.query(
    'UPDATE groups SET archived = true FROM users_groups WHERE groups.id=users_groups.group_id AND users_groups.group_id=$1 AND users_groups.user_id=$2 RETURNING *',
    [groupId, userId]
  )
    .then((results) => results.rows[0]);
};

const createGroup = ({ name, userId }) => {
  return pool.query('INSERT INTO groups(name) values ($1) RETURNING *', [name])
    .then((results) => {
      return addUserToGroup({ groupId: results.rows[0].id, userId })
        .then(() => results.rows[0]);
    });
};

const createGroupWithUsersAndRequest = ({ name, emails, userId }) => {
  return (async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const groupResult = await client.query('INSERT INTO groups(name) values ($1) RETURNING *', [name]);
      const newGroup = groupResult.rows[0];

      const emailPromises = emails.map((email) => {
        return client.query('INSERT INTO users(email) values ($1) ON CONFLICT (email) DO NOTHING', [email])
      });
      await Promise.all(emailPromises);

      const usersResult = await client.query('SELECT * FROM users WHERE email = ANY($1::text[])', [emails]);
      const users = usersResult.rows;

      const userPromises = [...users, {id: userId}].map((user) => {
        return client.query('INSERT INTO users_groups(group_id, user_id) values ($1, $2) ON CONFLICT (group_id, user_id) DO NOTHING', [newGroup.id, user.id])
          .then(() => {
            return client.query('UPDATE users_groups set archived = false WHERE group_id=$1 AND user_id=$2 RETURNING *', [newGroup.id, user.id])
          });
      });
      await userPromises;

      const timeOpen = new Date();
      timeOpen.setHours(0,0,0,0);
      const timeClose = new Date();
      timeClose.setDate(timeClose.getDate() + 5);
      timeClose.setHours(23,59,59,999);

      await client.query('INSERT INTO request_for_posts(group_id, time_open, time_close) values ($1, $2, $3) RETURNING *', [newGroup.id, timeOpen, timeClose]);

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  })();
};

const removeUserFromGroup = ({ groupId, userId }) => {
  return pool.query('UPDATE users_groups SET archived = true WHERE group_id=$1 AND user_id=$2 RETURNING *', [groupId, userId])
    .then((results) => results.rows[0]);
};

const addUserToGroup = ({ groupId, userId }) => {
  return pool.query('INSERT INTO users_groups(group_id, user_id) values ($1, $2) ON CONFLICT (group_id, user_id) DO NOTHING;', [groupId, userId]).then(() => {
    return pool.query('UPDATE users_groups set archived = false WHERE group_id=$1 AND user_id=$2 RETURNING *', [groupId, userId])
  })
    .then((results) => results.rows[0]);
};

const getGroupPosts = ({ groupId }) => {
  return pool.query(
    'select p.id, p.message, p.request_for_post_id, u.email, u.name from posts as p inner join users as u on u.id=p.user_id inner join request_for_posts as r on p.request_for_post_id=r.id inner join users_groups as ug on u.id=ug.user_id where ug.group_id=$1 and p.archived=FALSE and r.group_id=$1;',
    [groupId]
  ).then((results) => results.rows);
};

module.exports = {
  createGroup,
  removeUserFromGroup,
  getGroups,
  addUserToGroup,
  getGroup,
  archiveGroup,
  getGroupPosts,
  createGroupWithUsersAndRequest
};

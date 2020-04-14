const pool = require('../db');
const sgMail = require('@sendgrid/mail');
const { getUsersByGroupId } = require('../resources/Users');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { checkInTemplate } = require('./checkInTemplate');

const getAllOpenRequestsWithUsers = () => {
  return pool.query('select r.id as request_for_post_id, r.group_id, u.id as user_id, u.name, u.email, u.phone, g.name as group_name, r.time_close from request_for_posts as r inner join users_groups as ug on r.group_id=ug.group_id inner join users as u on ug.user_id=u.id inner join groups as g on ug.group_id=g.id where u.archived=false and ug.archived=false and r.time_open <= now() and r.time_close >= now() and g.archived=false')
    .then((results) => results.rows);
};

const hasAnySentEmails = ({ userId, requestForPostId }) => {
  return pool.query(
    'select * from sent_emails where user_id=$1 and request_for_post_id=$2',
    [userId, requestForPostId]
  )
    .then((results) => results.rows.length > 0);
};

const hasUndeliverableEmails = ({ userId, requestForPostId }) => {
  return pool.query(
    'select * from sent_emails where user_id=$1 and request_for_post_id=$2 and (status=$3 or status=$4)',
    [userId, requestForPostId, 'bounce', 'dropped']
  )
    .then((results) => results.rows.length > 0);
};

const hasDeliveredEmail = ({ userId, requestForPostId }) => {
  return pool.query(
    'select * from sent_emails where user_id=$1 and request_for_post_id=$2 and status=$3',
    [userId, requestForPostId, 'delivered']
  )
    .then((results) => results.rows.length > 0);
};

const usersToSendEmailsTo = (requestsWithUsers) => {
  const promises = requestsWithUsers.map((requestsWithUser) => {
    const userId = requestsWithUser.user_id
    const requestForPostId = requestsWithUser.request_for_post_id
    return hasAnySentEmails({ userId, requestForPostId })
      .then((hasSentEmails) => {
        if (hasSentEmails) {
          return hasUndeliverableEmails({ userId, requestForPostId })
            .then((undeliverableEmails) => {
              if (!undeliverableEmails) {
                return hasDeliveredEmail({ userId, requestForPostId })
                  .then((deliveredEmail) => {
                    if (!deliveredEmail) {
                      return requestsWithUser;
                    }
                  });
              }
            });
        } else {
          return requestsWithUser;
        }
      })
      .catch(() => null);
  });
  return Promise.all(promises)
    .then((possibleRequestsWithUsers) => possibleRequestsWithUsers.filter((p) => !!p));
};

const getUsersInGroup = (requestsWithUsers) => {
  const uniqueGroupIds = requestsWithUsers.reduce((accum, requestsWithUser) => {
    accum[requestsWithUser.group_id] = null;
    return accum;
  }, {});
  const promises = Object.keys(uniqueGroupIds).map((groupId) => {
    return getUsersByGroupId({ groupId })
      .then((users) => {
        uniqueGroupIds[groupId] = users.map((user) => user.email);
      })
      .catch(() => null);
  });
  return Promise.all(promises).then(() => uniqueGroupIds);
};

const createEmailPayload = (to, html, { userId, requestForPostId }) => {
  return {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Time to Check In',
    html,
    custom_args: {
      userId,
      requestForPostId,
    },
  };
};

const createEmails = (requestsWithUsers) => {
  return getUsersInGroup(requestsWithUsers)
    .then((usersInGroups) => {
      return requestsWithUsers.map((requestsWithUser) => {
        return createEmailPayload(
          requestsWithUser.email,
          checkInTemplate(
            requestsWithUser.group_name,
            usersInGroups[requestsWithUser.group_id].join(', '),
            requestsWithUser.time_close.toString()
          ),
          { userId: requestsWithUser.user_id, requestForPostId: requestsWithUser.request_for_post_id }
        )
      });
    });
};

const sendEmails = (requestsWithUsers) => {
  return createEmails(requestsWithUsers)
    .then((emailPayloads) => sgMail.send(emailPayloads))
    .catch((error) => console.log('error.response.body.errors', error.response.body.errors));
};

const main = () => {
  getAllOpenRequestsWithUsers()
    .then(usersToSendEmailsTo)
    .then(sendEmails)
    .catch((error) => console.log('error', error));
};

main();

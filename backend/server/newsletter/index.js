const pool = require('../db');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { newsletterTemplate } = require('./newsletterTemplate');

const getClosedRequestsWithNoSentNewsletter = () => {
  return pool.query('select * from request_for_posts as r where r.time_close <= now() and r.archived=false and r.sent_newsletter=false')
    .then((results) => results.rows);
};

const getPostsWithUsers = (requestForPosts) => {
  const promises = requestForPosts.map((requestForPost) => {
    return pool.query(
      'select u.email, p.message, p.request_for_post_id, r.group_id from posts as p inner join request_for_posts as r on p.request_for_post_id=r.id inner join users as u on p.user_id=u.id where r.id=$1',
      [requestForPost.id]
    )
    .then((results) => results.rows);
  });

  return Promise.all(promises);
};

const createEmailPayload = (to, html) => {
  return {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Here is what happening in your group',
    html,
  };
};

const createEmailsFromPosts = (groupsOfPosts) => {
  return groupsOfPosts.map((posts) => {
    return posts.map((post) => {
      return createEmailPayload(post.email, newsletterTemplate(posts))
    });
  }).flat();
};

const sendEmails = (emailPayloads) => {
  return sgMail.send(emailPayloads)
    .catch((error) => console.log('error.response.body.errors', error.response.body.errors));
};

const updatePostsAsSentNewsletters = (requestsForPostIds) => {
  return pool.query(
    'UPDATE request_for_posts SET sent_newsletter = true WHERE id = ANY($1::uuid[])',
    [requestsForPostIds]
  );
};

const main = () => {
  return getClosedRequestsWithNoSentNewsletter()
    .then(requestsForPosts => {
      return getPostsWithUsers(requestsForPosts)
        .then(createEmailsFromPosts)
        .then(sendEmails)
        .then(() => updatePostsAsSentNewsletters(requestsForPosts.map(r => r.id)));
    })
    .catch((error) => console.log('error', error));;
};

module.exports = main;

const express = require("express");
const router = express.Router();
const { Issuer } = require("openid-client");
const { createUser, getUserByEmail } = require('../resources/Users');
const { createAuth } = require('../resources/EmailOnlyAuthIds');
const handleRejection = require('../middleware/handleRejection');
const { SERVER_DOMAIN } = process.env;

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const clientPromise = Issuer.discover("https://did.app").then((issuer) => {
  console.log("Discovered issuer %s %O", issuer.issuer, issuer.metadata);
  return new issuer.Client({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });
});

router.get("/authenticate", handleRejection((req, res, next) => {
  clientPromise.then((client) => {
    const authorizationUrl = client.authorizationUrl({
      scope: "openid",
      redirect_uri: `${SERVER_DOMAIN}/session/callback`
    });
    res.redirect(authorizationUrl);
  });
}));

router.get("/callback", handleRejection((req, res, next) => {
  return clientPromise
    .then((client) => {
      const params = client.callbackParams(req);
      return client.callback(`${SERVER_DOMAIN}/session/callback`, params);
    })
    .then((tokenSet) => {
      const claims = tokenSet.claims();
      console.log(claims);
      return createUser({ email: claims.email })
        .then(() => getUserByEmail({ email: claims.email }))
        .then((user) => {
          return createAuth({userId: user.id, authId: claims.sub});
        })
        .then(() => {
          req.session = { userId: claims.sub };
          res.redirect("/");
        });
    });
}));

module.exports = router;

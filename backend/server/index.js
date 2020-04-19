const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const { SESSION_SECRET, IS_AZURE_FUNCTION, FRONT_END_DOMAIN, COOKIE_DOMAIN, IS_SECURE_COOKIE } = process.env;
const createHandler = require("azure-function-express").createHandler;
const authenticationRequired = require('./middleware/authenticationRequired');
const multer  = require('multer');
const upload = multer();
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const requestForPostsRouter = require('./routes/requestForPosts');
const groupsRouter = require('./routes/groups');
const sessionRouter = require("./routes/session");
const postsRouter = require("./routes/posts");
const sendGridRouter = require("./routes/sendGrid");
const processEmailRouter = require("./routes/processEmail");

const app = express();
app.set('trust proxy', true);

app.use(cors({ origin: FRONT_END_DOMAIN, credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'checkIn',
  secret: SESSION_SECRET,
  domain: COOKIE_DOMAIN,
  secure: IS_SECURE_COOKIE === 'true',
}));

app.use('/api/', indexRouter);
app.use('/api/users', authenticationRequired, usersRouter);
app.use('/api/groups', authenticationRequired, groupsRouter);
app.use('/api/request-for-posts', authenticationRequired, requestForPostsRouter);
app.use('/api/posts', authenticationRequired, postsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/send-grid", sendGridRouter);
app.use("/api/process-email", upload.array(), processEmailRouter);

let server = app

if (IS_AZURE_FUNCTION === 'true') {
  server = createHandler(app);
}

module.exports = server;

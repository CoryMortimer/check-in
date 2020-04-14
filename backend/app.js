const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const { SESSION_SECRET } = process.env;
const authenticationRequired = require('./middleware/authenticationRequired');
const multer  = require('multer');
const upload = multer();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const requestForPostsRouter = require('./routes/requestForPosts');
const groupsRouter = require('./routes/groups');
const sessionRouter = require("./routes/session");
const postsRouter = require("./routes/posts");
const sendGridRouter = require("./routes/sendGrid");
const processEmailRouter = require("./routes/processEmail");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({ name: 'checkIn', secret: SESSION_SECRET }));

app.use('/', indexRouter);
app.use('/users', authenticationRequired, usersRouter);
app.use('/groups', authenticationRequired, groupsRouter);
app.use('/request-for-posts', authenticationRequired, requestForPostsRouter);
app.use('/posts', authenticationRequired, postsRouter);
app.use("/session", sessionRouter);
app.use("/send-grid", sendGridRouter);
app.use("/process-email", upload.array(), processEmailRouter);

module.exports = app;

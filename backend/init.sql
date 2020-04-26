CREATE EXTENSION pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  archived BOOL DEFAULT FALSE,
  created_at timestamp default current_timestamp
);
CREATE UNIQUE INDEX email_idx ON users (email);

CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  archived BOOL DEFAULT FALSE,
  created_at timestamp default current_timestamp
);

CREATE TABLE users_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  group_id UUID NOT NULL REFERENCES groups(id),
  archived BOOL DEFAULT FALSE,
  created_at timestamp default current_timestamp,
  unique (user_id, group_id)
);
CREATE UNIQUE INDEX user_id_and_group_id_idx ON users_groups (user_id, group_id);

CREATE TABLE email_only_auth_ids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id),
  auth_id TEXT UNIQUE,
  archived BOOL DEFAULT FALSE,
  created_at timestamp default current_timestamp
);
CREATE UNIQUE INDEX user_id_for_email_idx ON email_only_auth_ids (user_id);
CREATE UNIQUE INDEX auth_id_for_email_idx ON email_only_auth_ids (auth_id);

CREATE TABLE request_for_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id),
  time_open TIMESTAMP,
  time_close TIMESTAMP,
  sent_newsletter BOOL DEFAULT FALSE,
  archived BOOL DEFAULT FALSE,
  created_at timestamp default current_timestamp
);
CREATE UNIQUE INDEX group_id_for_r_f_p_idx ON request_for_posts (group_id);
CREATE INDEX sent_newsletter_for_r_f_p_idx ON request_for_posts (sent_newsletter);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT,
  request_for_post_id UUID REFERENCES request_for_posts(id),
  user_id UUID REFERENCES users(id),
  archived BOOL DEFAULT FALSE,
  created_at timestamp default current_timestamp,
  unique (user_id, request_for_post_id)
);
CREATE INDEX request_for_post_id_idx ON posts (request_for_post_id);
CREATE INDEX user_id_for_posts_idx ON posts (user_id);

CREATE TABLE sent_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  request_for_post_id UUID REFERENCES request_for_posts(id),
  user_id UUID REFERENCES users(id),
  status TEXT,
  created_at timestamp default current_timestamp
);
CREATE INDEX user_id_and_request_id_idx ON sent_emails (user_id, request_for_post_id);

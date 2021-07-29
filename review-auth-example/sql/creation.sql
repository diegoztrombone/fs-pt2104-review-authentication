DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  hash TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT false,
  confirmation_token TEXT,
  profile_pic TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
)

DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users  (
    id uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    birthdate DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT false,
    confirmation_token TEXT DEFAULT NULL,
    password_token TEXT DEFAULT NULL,
    profile_pic TEXT DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
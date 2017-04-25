DROP DATABASE IF EXISTS waterdata;
CREATE DATABASE waterdata;

\c waterdata;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  active BOOLEAN
);

CREATE TABLE sites (
  site_id VARCHAR PRIMARY KEY,
  site_name VARCHAR,
  lat VARCHAR,
  long VARCHAR,
  address VARCHAR,
  hydrograph VARCHAR
);

CREATE TABLE user_sites (
  subscription_id SERIAL PRIMARY KEY,
  user_id VARCHAR,
  site_id VARCHAR,
  email BOOLEAN,
  text_msg BOOLEAN
);

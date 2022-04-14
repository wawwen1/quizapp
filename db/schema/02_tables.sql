DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  password VARCHAR(60)
);
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  private BOOLEAN NOT NULL,
  created DATE NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(510) NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  answer TEXT NOT NULL,
  correct BOOLEAN DEFAULT FALSE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  results TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE
);

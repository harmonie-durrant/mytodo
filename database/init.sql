CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE IF NOT EXISTS user (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL,
  firstname VARCHAR(30) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(75) NOT NULL,
  description VARCHAR(500) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_time DATETIME NOT NULL,
  status ENUM('not started', 'todo', 'in progress', 'done') DEFAULT 'not started',
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO user (email, password, name, firstname)
VALUES ("harmoniedurrant@gmail.com", "$2a$10$9GRJK22RaAEqxKkLfPN6hOiRplDKWJvbnvQYy2O9MKyr7rivdJARi", "Durrant", "Harmonie");

-- the password is hashed using bcrypt.hashSync("password", 10)
-- so the password is "password"
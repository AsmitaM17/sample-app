-- 1) Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS college_db;

-- 2) Switch to using this database
USE college_db;

-- 3) Create students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  stream VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  college VARCHAR(100),
  semester INT
);

-- 4) Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255)
);

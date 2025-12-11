-- Create database and students table

CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  stream VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  college VARCHAR(100),
  semester INT
);

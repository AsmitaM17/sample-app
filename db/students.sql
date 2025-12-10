CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  stream VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  college VARCHAR(100),
  semester INT
);
INSERT INTO students (name, stream, age, gender, college, semester) VALUES
('Alice Johnson', 'Computer Science', 20, 'Female', 'Tech University', 4),
('Bob Smith', 'Mechanical Engineering', 22, 'Male', 'Engineering College', 6),
('Catherine Lee', 'Electrical Engineering', 21, 'Female', 'Tech University', 5),
('David Brown', 'Civil Engineering', 23, 'Male', 'Engineering College', 7),
('Eva Green', 'Computer Science', 19, 'Female', 'Tech University', 3),
('Frank White', 'Mechanical Engineering', 24, 'Male', 'Engineering College', 8);


-- 1) Use the correct database
USE college_db;

-- 2) Optional: clear existing data (be careful in production)
DELETE FROM students;
DELETE FROM admins;

-- 3) Insert sample admins (passwords are placeholders; use hashed values in real setups)
INSERT INTO admins (username, password) VALUES
  ('admin1', 'hashed_password_admin1'),
  ('admin2', 'hashed_password_admin2');

-- 4) Insert sample students
INSERT INTO students (name, stream, age, gender, college, semester) VALUES
  ('Rahul Sharma', 'Computer Science', 20, 'Male', 'ABC Engineering College', 4),
  ('Priya Verma', 'Electronics', 21, 'Female', 'ABC Engineering College', 5),
  ('Amit Singh', 'Mechanical', 22, 'Male', 'XYZ Institute of Technology', 6),
  ('Sneha Rao', 'Information Technology', 19, 'Female', 'ABC Engineering College', 3),
  ('Arjun Mehta', 'Computer Science', 21, 'Male', 'XYZ Institute of Technology', 5);

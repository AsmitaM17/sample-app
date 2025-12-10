CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255) -- store hashed passwords
);
INSERT INTO admins (username, password) VALUES
('admin1', 'hashed_password_1'),
('admin2', 'hashed_password_2');
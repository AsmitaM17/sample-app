import sys
import os
import bcrypt

# Add parent directory to path so we can import from models/db
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db.connection import get_connection

def create_admin(username, password):
    # Hash the password with bcrypt
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    # Insert into database
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        query = "INSERT INTO admins (username, password) VALUES (%s, %s)"
        cursor.execute(query, (username, hashed_password.decode('utf-8')))
        conn.commit()
        print(f"✅ Admin '{username}' created successfully!")
    except Exception as e:
        print(f"❌ Error: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    print("=== Create Admin User ===\n")
    
    username = input("Enter admin username: ").strip()
    password = input("Enter admin password: ").strip()
    
    if not username or not password:
        print("❌ Username and password cannot be empty!")
        sys.exit(1)
    
    create_admin(username, password)

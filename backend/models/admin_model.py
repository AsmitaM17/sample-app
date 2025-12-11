from db.connection import get_connection

def get_admin_by_username(username):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM admins WHERE username = %s"
    cursor.execute(query, (username,))
    admin = cursor.fetchone()  # one row or None
    cursor.close()
    conn.close()
    return admin
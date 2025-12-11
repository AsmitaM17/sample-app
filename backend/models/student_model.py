from db.connection import get_connection

def get_all_students():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

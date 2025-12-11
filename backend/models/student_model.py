from db.connection import get_connection

def get_all_students():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def get_student_by_id(student_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students WHERE id = %s", (student_id,))
    student = cursor.fetchone()
    cursor.close()
    conn.close()
    return student

def create_student(data):
    conn = get_connection()
    cursor = conn.cursor()
    query = """
        INSERT INTO students (name, stream, age, gender, college, semester)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (data["name"], data["stream"], data["age"], 
              data["gender"], data["college"], data["semester"])
    cursor.execute(query, values)
    conn.commit()
    student_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return student_id

def update_student(student_id, data):
    conn = get_connection()
    cursor = conn.cursor()
    
    # Build dynamic update query
    fields = []
    values = []
    for key in ["name", "stream", "age", "gender", "college", "semester"]:
        if key in data:
            fields.append(f"{key} = %s")
            values.append(data[key])
    
    if not fields:
        return False
    
    values.append(student_id)
    query = f"UPDATE students SET {', '.join(fields)} WHERE id = %s"
    cursor.execute(query, values)
    conn.commit()
    affected = cursor.rowcount
    cursor.close()
    conn.close()
    return affected > 0

def delete_student(student_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM students WHERE id = %s", (student_id,))
    conn.commit()
    affected = cursor.rowcount
    cursor.close()
    conn.close()
    return affected > 0

def search_students(name, stream):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    query = "SELECT * FROM students WHERE 1=1"
    params = []
    
    if name:
        query += " AND name LIKE %s"
        params.append(f"%{name}%")
    if stream:
        query += " AND stream LIKE %s"
        params.append(f"%{stream}%")
    
    cursor.execute(query, params)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results
